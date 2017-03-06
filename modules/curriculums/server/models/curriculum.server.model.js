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
  },
  technique: {
  	type: Schema.ObjectId,
  	ref: 'Technique'
  }
});

mongoose.model('Curriculum', CurriculumSchema);
