'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Formation = mongoose.model('Formation'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an formation
 */
exports.create = function (req, res) {
  var formation = new Formation(req.body);
  formation.user = req.user;

  formation.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(formation);
    }
  });
};

/**
 * Show the current formation
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var formation = req.formation ? req.formation.toJSON() : {};
  // Add a custom field to the Formation, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Formation model.
  formation.isCurrentUserOwner = !!(req.user && formation.user && formation.user._id.toString() === req.user._id.toString());

  res.json(formation);
};

/**
 * Update an formation
 */
exports.update = function (req, res) {
  var formation = req.formation;
  formation.intitule = req.body.intitule;
  formation.organisme = req.body.organisme;
  formation.domaine = req.body.domaine;
  formation.dateDebut = req.body.dateDebut;
  formation.dateFin = req.body.dateFin;
  formation.diplome = req.body.diplome;

  formation.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(formation);
    }
  });
};

/**
 * Delete an formation
 */
exports.delete = function (req, res) {
  var formation = req.formation;

  formation.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(formation);
    }
  });
};

/**
 * List of Formations
 */
exports.list = function (req, res) {
  Formation.find().sort('-created').populate('user', 'displayName').exec(function (err, formations) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(formations);
    }
  });
};

/**
 * Formation middleware
 */
exports.formationByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Formation is invalid'
    });
  }
  Formation.findById(id).populate('user', 'displayName').exec(function (err, formation) {
    if (err) {
      return next(err);
    } else if (!formation) {
      return res.status(404).send({
        message: 'No formation with that identifier has been found'
      });
    }
    req.formation = formation;
    next();
  });
};

////////////////////////// formations by user ////////////////// 
exports.formationsByConnectedUser = function (req, res) {
  Formation.find({ user: req.user._id }).exec(function (err, formations) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(formations);
    }
  });
};