'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * cv_Competence Schema
 */
var cv_CompetenceSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  cv_competencePedaName: {
    type: String,
    default: '',
    trim: true,
  },
  cv_competenceTechName: {
    type: String,
    default: '',
    trim: true,
  },
  
 
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('cv_Competence', cv_CompetenceSchema);
