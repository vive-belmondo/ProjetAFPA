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
  dateDebutMois: {
    type: String,
    default: '',
    trim: true,
  },
  dateDebutAnnee: {
    type: String,
    default: '',
    trim: true,
  },
  dateFinMois: {
    type: String,
    default: '',
    trim: true,
  },
  dateFinAnnee: {
    type: String,
    default: '',
    trim: true,
  },
  mission: {
    type: String,
    default: '',
    trim: true,
  },
  cv: {
    type: Schema.ObjectId,
    ref: 'Curriculum'
  }
});

mongoose.model('Experience', ExperienceSchema);
