'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Etablissement = mongoose.model('Etablissement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an etablissement
 */
exports.create = function (req, res) {
  var etablissement = new Etablissement(req.body);
  etablissement.user = req.user;

  etablissement.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(etablissement);
    }
  });
};

/**
 * Show the current etablissement
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var etablissement = req.etablissement ? req.etablissement.toJSON() : {};

  // Add a custom field to the Etablissement, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Etablissement model.
  etablissement.isCurrentUserOwner = !!(req.user && etablissement.user && etablissement.user._id.toString() === req.user._id.toString());

  res.json(etablissement);
};

/**
 * Update an etablissement
 */
exports.update = function (req, res) {
  var etablissement = req.etablissement;


  etablissement.etablissementName = req.body.etablissementName;
  etablissement.cp = req.body.cp;
  etablissement.dpt = req.body.dpt;
  etablissement.adresse = req.body.adresse;





  etablissement.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(etablissement);
    }
  });
};

/**
 * Delete an etablissement
 */
exports.delete = function (req, res) {
  var etablissement = req.etablissement;

  etablissement.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(etablissement);
    }
  });
};

/**
 * List of Etablissements
 */
exports.list = function (req, res) {
  Etablissement.find().sort('-created').populate('user', 'displayName').exec(function (err, etablissements) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(etablissements);
    }
  });
};

/**
 * Etablissement middleware
 */
exports.etablissementByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Etablissement is invalid'
    });
  }

  Etablissement.findById(id).populate('user', 'displayName').exec(function (err, etablissement) {
    if (err) {
      return next(err);
    } else if (!etablissement) {
      return res.status(404).send({
        message: 'No etablissement with that identifier has been found'
      });
    }
    req.etablissement = etablissement;
    next();
  });
};
