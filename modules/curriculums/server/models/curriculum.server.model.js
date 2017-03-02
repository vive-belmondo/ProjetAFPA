'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Curriculum Schema
 */
var CurriculumSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  competence: {
  	type: Schema.ObjectId,
  	ref: 'Competence'
  }
});

mongoose.model('Curriculum', CurriculumSchema);
