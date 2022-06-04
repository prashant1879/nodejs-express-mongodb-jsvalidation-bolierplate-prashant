'use strict';

const { body } = require('express-validator/check')

exports.validate = (method) => {
  switch (method) {
    case 'createProject': {
      return [
        body('name').isLength({ min: 3 }, { min: 150 }).trim().escape().withMessage('Name is required filed.'),
        body('logo').optional(),
        body('members').isArray().not().isEmpty().withMessage('Minimum 1 member required.'),
        body('admins').isArray().not().isEmpty().withMessage('Minimum 1 admin required.')
      ]
    }
  }
}