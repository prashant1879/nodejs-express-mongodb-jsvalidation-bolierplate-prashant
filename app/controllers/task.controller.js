let Project = require('../models/project.model');
let Task = require('../models/task.model');
let Auth = require('../helpers/auth.helper');
let Helper = require('../helpers/common.helper');
const { ObjectId } = require('mongodb'); // or ObjectID 



const { validationResult } = require('express-validator/check');

module.exports = {

  /**
   * User can taks from projects where user has been added.
   */
  create: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        Helper.handleError(res, 400, "Required inputs are invalid.", false, { error: errors.array() });
        return;
      }

      //prepare inputs for data.
      let { _id: userId } = await Auth.getUserData(req);
      let description = req.body.description;
      let projectId = req.body.projectId;
      let status = (req.body.hasOwnProperty('status')) ? req.body.status : 'pending';

      //valiate its objectid or not
      if (!ObjectId.isValid(projectId)) {
        Helper.handleError(res, 400, "Invaid Project ID.", false, {});
        return;
      }

      //find project data basedon user and admin from database.
      let projectData = await Project.findOne({
        $or: [
          { members: { "$in": [userId] } },
          { admins: { "$in": [userId] } }
        ],
        $and: [
          { _id: projectId }
        ]
      });

      if (projectData === null) {
        Helper.handleError(res, 400, "Invaid Project ID.", false, {});
        return;
      }

      let taskData = await Task.create({
        description,
        createdBy: userId,
        projectId,
        status
      });

      //for security purpose remove password and token from auto pouplate response.
      taskData = JSON.parse(JSON.stringify(taskData));
      delete taskData.createdBy.password;
      delete taskData.createdBy.token;

      Helper.respondAsJSON(res, "Task has been created successfully.", taskData, true, 200);
    } catch (Error) {
      console.log(" > Error", Error);
      Helper.handleError(res);
    }
  },

  /**
   * Update status
   */
  updateTaskStatus: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        Helper.handleError(res, 400, "Required inputs are invalid.", false, { error: errors.array() });
        return;
      }

      let taskId = req.params.id;
      let status = req.body.status;
      let { _id: userId, role } = await Auth.getUserData(req);

      //valiate its objectid or not
      if (!ObjectId.isValid(taskId)) {
        Helper.handleError(res, 400, "Invaid task ID.", false, {});
        return;
      }

      let query = [
        {
          "$lookup": {
            "from": "projects",
            "localField": "projectId",
            "foreignField": "_id",
            "as": "projects"
          }
        },
        {
          $match: {
            $or: [
              { "projects.members": { "$in": [userId] } },
              { "projects.admins": { "$in": [userId] } },
            ]
          },
        },
        { $set: { status } }
      ];

      if (role == 'user') {
        query[1].$match.$and = [{
          "createdBy": ObjectId(userId)
        }]
      }

      let updatedData = await Task.aggregate(query);

      if (updatedData.length > 0) {
        Helper.respondAsJSON(res, "Task updated successfully.", updatedData, true, 200);
      } else {
        Helper.handleError(res, 401, "You dont have permission to update this task.", false, {});
        return;
      }
    } catch (Error) {
      console.log(" > Error", Error);
      Helper.handleError(res);
    }
  },

  getAll: async (req, res) => {
    try {
      let { _id: userId } = await Auth.getUserData(req);
      // let query = {
      //   $or: [
      //     { members: { "$in": [userId] } },
      //     { admins: { "$in": [userId] } }
      //   ]
      // };

      let query = [
        {
          "$lookup": {
            "from": "projects",
            "localField": "projectId",
            "foreignField": "_id",
            "as": "projects"
          }
        },
        {
          $match: {
            $or: [
              { "projects.members": { "$in": [userId] } },
              { "projects.admins": { "$in": [userId] } },
            ]
          },
        }
      ];

      let taskData = await Task.aggregate(query);
      if (taskData.length > 0) {
        Helper.respondAsJSON(res, "Task fetch successfully.", taskData, true, 200);
        return
      } else {
        Helper.respondAsJSON(res, "No Data Found.", {}, true, 200);
      }
    } catch (Error) {
      console.log(" > Error", Error);
      Helper.handleError(res);
    }

  }

};
