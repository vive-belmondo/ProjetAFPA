'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Technique Schema
 */
var TechniqueSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  techniqueName: {
    type: String,
    default: '',
    trim: true,
  },
  cv: {
    type: Schema.ObjectId,
    ref: 'Curriculum'
  }
});

mongoose.model('Technique', TechniqueSchema);
