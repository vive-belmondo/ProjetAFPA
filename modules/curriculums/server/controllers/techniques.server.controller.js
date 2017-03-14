'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Technique = mongoose.model('Technique'),
  Curriculum = mongoose.model('Curriculum'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an technique
 */
exports.create = function (req, res) {
  var technique = new Technique(req.body);
  technique.cv = req.user.cv;

  technique.save(function (err, technique) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      Curriculum.findById(technique.cv).exec(function (err, curriculum) {
        if (err) {
          return next(err);
        } else if (!technique) {
          return res.status(404).send({
            message: 'No technique with that identifier has been found'
          });
        }
        curriculum.techniques.push(technique._id);
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
 * Show the current technique
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var technique = req.technique ? req.technique.toJSON() : {};

  // Add a custom field to the Technique, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Technique model.
  technique.isCurrentUserOwner = !!(req.user && technique.user && technique.user._id.toString() === req.user._id.toString());

  res.json(technique);
};

/**
 * Update an technique
 */
exports.update = function (req, res) {
  var technique = req.technique;

  technique.techniqueName = req.body.techniqueName;


  technique.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(technique);
    }
  });
};

/**
 * Delete an technique
 */
exports.delete = function (req, res) {
  var technique = req.technique;

  technique.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(technique);
    }
  });
};

/**
 * List of Techniques
 */
exports.list = function (req, res) {
  Technique.find().sort('-created').populate('user', 'displayName').exec(function (err, techniques) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(techniques);
    }
  });
};

/**
 * Technique middleware
 */
exports.techniqueByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Technique is invalid'
    });
  }

  Technique.findById(id).populate('user', 'displayName').exec(function (err, technique) {
    if (err) {
      return next(err);
    } else if (!technique) {
      return res.status(404).send({
        message: 'No technique with that identifier has been found'
      });
    }
    req.technique = technique;
    next();
  });
};

////////////////////////// techniques by user ////////////////// 
exports.techniquesByConnectedUser = function (req, res) {
  Technique.find({ cv: req.user.cv }).exec(function (err, techniques) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log(techniques);
      res.json(techniques);
    }
  });
};




