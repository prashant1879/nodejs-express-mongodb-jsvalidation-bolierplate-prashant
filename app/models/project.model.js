'use strict';

let mongoose = require('bluebird').promisifyAll(require('mongoose'));
let Schema = mongoose.Schema;
let autopopulate = require('mongoose-autopopulate');
let paginate = require('mongoose-paginate');

let Project = new Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
    required: true,
  },
  logo: {
    type: String,
  },
  admins: {
    type: Array,
    required: true,
  },
}, { timestamps: true, versionKey: false });

Project.plugin(autopopulate);
Project.plugin(paginate);

module.exports = mongoose.model('Project', Project);