'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Fonction = mongoose.model('Fonction'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an fonction
 */
exports.create = function (req, res) {
  var fonction = new Fonction(req.body);
  fonction.user = req.user;

  fonction.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(fonction);
    }
  });
};

/**
 * Show the current fonction
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var fonction = req.fonction ? req.fonction.toJSON() : {};

  // Add a custom field to the Fonction, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Fonction model.
  fonction.isCurrentUserOwner = !!(req.user && fonction.user && fonction.user._id.toString() === req.user._id.toString());

  res.json(fonction);
};

/**
 * Update an fonction
 */
exports.update = function (req, res) {
  var fonction = req.fonction;

  fonction.fonctionName = req.body.fonctionName;


  fonction.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(fonction);
    }
  });
};

/**
 * Delete an fonction
 */
exports.delete = function (req, res) {
  var fonction = req.fonction;

  fonction.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(fonction);
    }
  });
};

/**
 * List of Fonctions
 */
exports.list = function (req, res) {
  Fonction.find().sort('-created').populate('user', 'displayName').exec(function (err, fonctions) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(fonctions);
    }
  });
};

/**
 * Fonction middleware
 */
exports.fonctionByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Fonction is invalid'
    });
  }

  Fonction.findById(id).populate('user', 'displayName').exec(function (err, fonction) {
    if (err) {
      return next(err);
    } else if (!fonction) {
      return res.status(404).send({
        message: 'No fonction with that identifier has been found'
      });
    }
    req.fonction = fonction;
    next();
  });
};
