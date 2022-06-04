let Project = require('../models/project.model');
let Helper = require('../helpers/common.helper');
let Auth = require('../helpers/auth.helper');

const { validationResult } = require('express-validator/check');

module.exports = {

  /**
   * User can create projects.
   * Project has id, name, logo (optional), and members and admins.
   */
  create: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        Helper.handleError(res, 400, "Required inputs are invalid.", false, { error: errors.array() });
        return;
      }

      let name = req.body.name;
      let admins = req.body.admins;
      let members = req.body.members;

      let projectData = await Project.create({ name, admins, members });
      Helper.respondAsJSON(res, "Project has been created successfully.", projectData, true, 200);

    } catch (Error) {
      Helper.handleError(res);
      return;
    }
  },

  /*
  * Get all projects from database.
  */
  getAll: async (req, res) => {
    try {
      //fetch userdata/id from header/token
      let { _id: userId } = await Auth.getUserData(req);

      let query = {
        $or: [
          { members: { "$in": [userId] } },
          { admins: { "$in": [userId] } }
        ]
      };

      let paginator = Helper.getPaginator(req);
      paginator.sort = { priority: -1 };

      let projectData = await Project.paginate(query, paginator);
      Helper.respondAsJSON(res, "Project fetch successfully.", projectData, true, 200);

    } catch (Error) {
      Helper.handleError(res);
      return;
    }

  }

};