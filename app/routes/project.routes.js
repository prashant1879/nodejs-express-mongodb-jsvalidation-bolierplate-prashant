'use strict';

let express = require('express');
let router = express.Router();
let ProjectController = require('../controllers/project.controller');
let ProjectValidator = require('../validation/project.validation');
let Authentication = require('../helpers/auth.helper');

router.post('/', ProjectValidator.validate('createProject'), Authentication.ensure, ProjectController.create);
router.get('/', Authentication.ensure, ProjectController.getAll);

module.exports = router;