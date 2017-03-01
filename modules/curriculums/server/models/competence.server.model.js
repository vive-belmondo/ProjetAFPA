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
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Competence', CompetenceSchema);
