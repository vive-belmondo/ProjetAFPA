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
  validation: {
    type: Boolean,
    default: false
  },
  competences: {
  	type: [{
  		type: Schema.ObjectId,
  		ref: 'Competence'
  	}],
  	default: []
  },
  techniques: {
    type: [{
      type: Schema.ObjectId,
      ref: 'Technique'
    }],
    default: []
  },
  langues: {
    type: [{
      type: Schema.ObjectId,
      ref: 'Langue'
    }],
    default: []
  },
  formations: {
    type: [{
      type: Schema.ObjectId,
      ref: 'Formation'
    }],
    default: []
  },
  experiences: {
    type: [{
      type: Schema.ObjectId,
      ref: 'Experience'
    }],
    default: []
  }
});

mongoose.model('Curriculum', CurriculumSchema);
