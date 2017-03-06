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
  langueLu: {
    type: String,
    default: '',
    trim: true,
    value: 'lu',
  },
  langueEcrit: {
    type: String,
    default: '',
    trim: true,
    value: 'écrit',
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Langue', LangueSchema);
