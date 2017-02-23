'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Etablissement Schema
 */
var EtablissementSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  etablissementName: {
    type: String,
    default: '',
    trim: true,
    required: 'ville cannot be blank'
  },
  cp: {
    type: Number,
    default: '',
    trim: true,
    required: 'code postal cannot be blank'
  },
  dpt: {
    type: Number,
    default: '',
    trim: true,
    required: 'departement cannot be blank'
  },
   
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Etablissement', EtablissementSchema);
