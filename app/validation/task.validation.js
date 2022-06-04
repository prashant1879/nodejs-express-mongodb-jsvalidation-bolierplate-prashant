'use strict';

const { body, param } = require('express-validator/check')

exports.validate = (method) => {
  switch (method) {

    case 'createTask': {
      return [
        body('description').isLength({ min: 3 }, { min: 150 }).trim().escape().withMessage('Description is required filed.'),
        body('projectId').trim().escape().not().isEmpty().withMessage('Minimum 1 member required.'),
        body('completed_at').trim().escape().optional().not().isEmpty().withMessage('Minimum 1 member required.'),
        body('status').optional().isIn(["pending", "completed", "inProgress"]).withMessage('Only pending, completed & inProgress status accepted.'),
      ]
    }

    case 'updateTaskStatus': {
      return [
        param('id').trim().escape().withMessage('ID is required filed.'),
        body('status').optional().isIn(["pending", "completed", "inProgress"]).withMessage('Only pending, completed & inProgress status accepted.'),
      ]
    }

  }
}