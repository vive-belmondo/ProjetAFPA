'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Formation = mongoose.model('Formation'),
  Curriculum = mongoose.model('Curriculum'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an formation
 */
exports.create = function (req, res) {
  var formation = new Formation(req.body);
  formation.cv = req.user.cv;

  formation.save(function (err, formation) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      Curriculum.findById(formation.cv).exec(function (err, curriculum) {
        if (err) {
          return next(err);
        } else if (!formation) {
          return res.status(404).send({
            message: 'No formation with that identifier has been found'
          });
        }
        curriculum.formations.push(formation._id);
        curriculum.save(function (err, curriculum) {
          if (err) {
            return res.status(422).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(curriculum);
          }
        });
      });
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
  formation.ville = req.body.ville;
  formation.diplome = req.body.diplome;
  formation.dateDebutMois = req.body.dateDebutMois;
  formation.dateDebutAnnee = req.body.dateDebutAnnee;
  formation.dateFinMois = req.body.dateFinMois;
  formation.dateFinAnnee = req.body.dateFinAnnee;


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
  Formation.find({ cv: req.user.cv }).exec(function (err, formations) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(formations);
    }
  });
};