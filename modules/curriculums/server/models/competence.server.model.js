'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Competence Schema
 */
var CompetenceSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  competenceName: {
    type: String,
    default: '',
    trim: true,
  },
  cv: {
    type: Schema.ObjectId,
    ref: 'Curriculum'
  }
});

mongoose.model('Competence', CompetenceSchema);
