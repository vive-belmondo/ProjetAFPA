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
  formations: [{
    type: Schema.ObjectId,
    ref: 'Formation'
  }],
  competences: [
  {
    type: Schema.ObjectId,
    ref: 'Competence'
  }],
  techniques: [{
    type: Schema.ObjectId,
    ref: 'Technique'
  }],
  experiences: [{
    type: Schema.ObjectId,
    ref: 'Experience'
  }],
  langues: [{
    type: Schema.ObjectId,
    ref: 'Langue'
  }]  
});

mongoose.model('Curriculum', CurriculumSchema);
