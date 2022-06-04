'use strict';

let mongoose = require('bluebird').promisifyAll(require('mongoose'));
let Schema = mongoose.Schema;
let autopopulate = require('mongoose-autopopulate');
let paginate = require('mongoose-paginate');

let Task = new Schema({
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: false,
    required: true
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    autopopulate: false,
    required: true
  },
  completedAt: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "inProgress"],
    default: 'pending'
  },
}, { timestamps: true, versionKey: false });

Task.plugin(autopopulate);
Task.plugin(paginate);

module.exports = mongoose.model('Task', Task);