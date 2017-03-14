'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Curriculum = mongoose.model('Curriculum'),
  Langue = mongoose.model('Langue'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an langue
 */
exports.create = function (req, res) {
  var langue = new Langue(req.body);
  langue.cv = req.user.cv;

  langue.save(function (err, langue) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      Curriculum.findById(langue.cv).exec(function (err, curriculum) {
        if (err) {
          return next(err);
        } else if (!langue) {
          return res.status(404).send({
            message: 'No langue with that identifier has been found'
          });
        }
        curriculum.langues.push(langue._id);
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
 * Show the current langue
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var langue = req.langue ? req.langue.toJSON() : {};
  // Add a custom field to the Langue, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Langue model.
  langue.isCurrentUserOwner = !!(req.user && langue.user && langue.user._id.toString() === req.user._id.toString());

  res.json(langue);
};

/**
 * Update an langue
 */
exports.update = function (req, res) {
  var langue = req.langue;
  langue.langueName = req.body.langueName;
  langue.niveau = req.body.niveau;

  langue.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(langue);
    }
  });
};

/**
 * Delete an langue
 */
exports.delete = function (req, res) {
  var langue = req.langue;

  langue.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(langue);
    }
  });
};

/**
 * List of Langues
 */
exports.list = function (req, res) {
  Langue.find().sort('-created').populate('user', 'displayName').exec(function (err, langues) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(langues);
    }
  });
};

/**
 * Langue middleware
 */
exports.langueByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Langue is invalid'
    });
  }
  Langue.findById(id).populate('user', 'displayName').exec(function (err, langue) {
    if (err) {
      return next(err);
    } else if (!langue) {
      return res.status(404).send({
        message: 'No langue with that identifier has been found'
      });
    }
    req.langue = langue;
    next();
  });
};

////////////////////////// langues by user ////////////////// 
exports.languesByConnectedUser = function (req, res) {
  Langue.find({ cv: req.user.cv }).exec(function (err, langues) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(langues);
    }
  });
};