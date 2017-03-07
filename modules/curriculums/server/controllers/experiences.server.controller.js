'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Experience = mongoose.model('Experience'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an experience
 */
exports.create = function (req, res) {
  var experience = new Experience(req.body);
  experience.user = req.user;

  experience.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(experience);
    }
  });
};

/**
 * Show the current experience
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var experience = req.experience ? req.experience.toJSON() : {};
  // Add a custom field to the Experience, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Experience model.
  experience.isCurrentUserOwner = !!(req.user && experience.user && experience.user._id.toString() === req.user._id.toString());

  res.json(experience);
};

/**
 * Update an experience
 */
exports.update = function (req, res) {
  var experience = req.experience;
  experience.entreprise = req.body.entreprise;
  experience.ville = req.body.ville;
  experience.poste = req.body.poste;
  experience.dateDebutMois = req.body.dateDebutMois;
  experience.dateDebutAnnee = req.body.dateDebutAnnee;
  experience.dateFinMois = req.body.dateFinMois;
  experience.dateFinAnnee = req.body.dateFinAnnee;
  experience.mission = req.body.mission;




  experience.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(experience);
    }
  });
};

/**
 * Delete an experience
 */
exports.delete = function (req, res) {
  var experience = req.experience;

  experience.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(experience);
    }
  });
};

/**
 * List of Experiences
 */
exports.list = function (req, res) {
  Experience.find().sort('-created').populate('user', 'displayName').exec(function (err, experiences) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(experiences);
    }
  });
};

/**
 * Experience middleware
 */
exports.experienceByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Experience is invalid'
    });
  }
  Experience.findById(id).populate('user', 'displayName').exec(function (err, experience) {
    if (err) {
      return next(err);
    } else if (!experience) {
      return res.status(404).send({
        message: 'No experience with that identifier has been found'
      });
    }
    req.experience = experience;
    next();
  });
};

////////////////////////// experiences by user ////////////////// 
exports.experiencesByConnectedUser = function (req, res) {
  Experience.find({ user: req.user._id }).exec(function (err, experiences) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(experiences);
    }
  });
};
