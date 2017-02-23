'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Fonction Schema
 */
var FonctionSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  fonctionName: {
    type: String,
    default: '',
    trim: true,
    required: 'Fonction cannot be blank'
  },
  
 
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Fonction', FonctionSchema);
