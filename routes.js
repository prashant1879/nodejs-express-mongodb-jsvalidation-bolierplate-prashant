'use strict';

let userRoutes = require('./app/routes/user.routes');
let projectRoutes = require('./app/routes/project.routes');
let taskRoutes = require('./app/routes/task.routes');

module.exports = (app) => {
  app.use('/api/v1/user', userRoutes);
  app.use('/api/v1/project', projectRoutes);
  app.use('/api/v1/task', taskRoutes);
};

