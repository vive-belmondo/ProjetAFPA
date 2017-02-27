'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  cv_Competence = mongoose.model('cv_Competence'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an cv_competence
 */
exports.create = function (req, res) {
  var cv_competence = new cv_Competence(req.body);
  cv_competence.user = req.user;

  cv_competence.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cv_competence);
    }
  });
};

/**
 * Show the current cv_competence
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var cv_competence = req.cv_competence ? req.cv_competence.toJSON() : {};

  // Add a custom field to the cv_Competence, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the cv_Competence model.
  cv_competence.isCurrentUserOwner = !!(req.user && cv_competence.user && cv_competence.user._id.toString() === req.user._id.toString());

  res.json(cv_competence);
};

/**
 * Update an cv_competence
 */
exports.update = function (req, res) {
  var cv_competence = req.cv_competence;

  cv_competence.cv_competenceName = req.body.cv_competenceName;


  cv_competence.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cv_competence);
    }
  });
};

/**
 * Delete an cv_competence
 */
exports.delete = function (req, res) {
  var cv_competence = req.cv_competence;

  cv_competence.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cv_competence);
    }
  });
};

/**
 * List of cv_Competences
 */
exports.list = function (req, res) {
  cv_Competence.find().sort('-created').populate('user', 'displayName').exec(function (err, cv_competences) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cv_competences);
    }
  });
};

/**
 * cv_Competence middleware
 */
exports.cv_competenceByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'cv_Competence is invalid'
    });
  }

  cv_Competence.findById(id).populate('user', 'displayName').exec(function (err, cv_competence) {
    if (err) {
      return next(err);
    } else if (!cv_competence) {
      return res.status(404).send({
        message: 'No cv_competence with that identifier has been found'
      });
    }
    req.cv_competence = cv_competence;
    next();
  });
};
