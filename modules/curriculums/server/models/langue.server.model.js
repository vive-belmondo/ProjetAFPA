'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Langue Schema
 */
var LangueSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  langueName: {
    type: String,
    default: '',
    trim: true,
  },
  niveau: {
    type: String,
    default: '',
    trim: true,
  },
  cv: {
    type: Schema.ObjectId,
    ref: 'Curriculum'
  }
});

mongoose.model('Langue', LangueSchema);
