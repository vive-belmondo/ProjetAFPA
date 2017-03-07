'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Competence Schema
 */
var ExperienceSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  entreprise: {
    type: String,
    default: '',
    trim: true,
  },
  ville: {
    type: String,
    default: '',
    trim: true,
  },
  poste: {
    type: String,
    default: '',
    trim: true,
  },
  dateDebut: {
    type: Date,
    default: '',
    trim: true,
  },
  dateFin: {
    type: Date,
    default: '',
    trim: true,
  },
  mission: {
    type: String,
    default: '',
    trim: true,
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Experience', ExperienceSchema);
