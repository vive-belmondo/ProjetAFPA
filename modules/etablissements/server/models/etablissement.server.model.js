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
    required: 'le nom de l\'etablissement est obligatoire'
  },
  cp: {
    type: Number,
    default: '',
    trim: true,
    required: 'le code postal est obligatoire '
  },
  ville: {
    type: String,
    default: '',
    trim: true,
    required: 'la ville est obligatoire'
  },
  adresse: {
    type: String,
    default:'',
    trim: true,
    required: 'l\'adresse est obligatoire'
  },
   
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Etablissement', EtablissementSchema);
