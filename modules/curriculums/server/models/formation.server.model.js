'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Competence Schema
 */
var FormationSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  intitule: {
    type: String,
    default: '',
    trim: true,
  },
  organisme: {
    type: String,
    default: '',
    trim: true,
  },
  domaine: {
    type: String,
    default: '',
    trim: true,
  },
  diplome: {
    type: String,
    default: '',
    trim: true,
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Formation', FormationSchema);
