'use strict';

let express = require('express');
let router = express.Router();
let TaskController = require('../controllers/task.controller');
let TaskValidator = require('../validation/task.validation');
let Authentication = require('../helpers/auth.helper');

router.post('/', TaskValidator.validate('createTask'), Authentication.ensure, TaskController.create);
router.patch('/:id', TaskValidator.validate('updateTaskStatus'), Authentication.ensure, TaskController.updateTaskStatus);
router.get('/', Authentication.ensure, TaskController.getAll);

module.exports = router;