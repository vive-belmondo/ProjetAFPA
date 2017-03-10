'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Competence = mongoose.model('Competence'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an competence
 */
exports.create = function (req, res) {
  var competence = new Competence(req.body);
  competence.cv = req.user.cv;

  competence.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(competence);
    }
  });
};

/**
 * Show the current competence
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var competence = req.competence ? req.competence.toJSON() : {};
  // Add a custom field to the Competence, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Competence model.
  competence.isCurrentUserOwner = !!(req.user && competence.user && competence.user._id.toString() === req.user._id.toString());

  res.json(competence);
};

/**
 * Update an competence
 */
exports.update = function (req, res) {
  var competence = req.competence;
  competence.competenceName = req.body.competenceName;

  competence.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(competence);
    }
  });
};

/**
 * Delete an competence
 */
exports.delete = function (req, res) {
  var competence = req.competence;

  competence.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(competence);
    }
  });
};

/**
 * List of Competences
 */
exports.list = function (req, res) {
  Competence.find().sort('-created').populate('user', 'displayName').exec(function (err, competences) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(competences);
    }
  });
};

/**
 * Competence middleware
 */
exports.competenceByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Competence is invalid'
    });
  }
  Competence.findById(id).populate('user', 'displayName').exec(function (err, competence) {
    if (err) {
      return next(err);
    } else if (!competence) {
      return res.status(404).send({
        message: 'No competence with that identifier has been found'
      });
    }
    req.competence = competence;
    next();
  });
};

////////////////////////// competences by user ////////////////// 
exports.competencesByConnectedUser = function (req, res) {
  Competence.find({ cv: req.user.cv }).exec(function (err, competences) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(competences);
    }
  });
};