'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  pdf = require('html-pdf'),
  handlebars = require('handlebars'),
  Curriculum = mongoose.model('Curriculum'),
  User = mongoose.model('User'),
  validator = require('validator');






exports.create = function (req, res) {
  var curriculum = new Curriculum();
  curriculum.user = req.user;

  curriculum.save(function (err) {
    if (err) {
      console.log(err);
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(curriculum);
    }
  });
};


/**
 * Validate an curriculum
 */
exports.validate = function (req, res) {
  console.log(req.user);
  Curriculum.findById(req.user.cv).exec(function (err, curriculum) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      curriculum.validation = true;

      curriculum.save(function (err) {
        if (err) {
          return res.status(422).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json(curriculum);
        }
      });
    }
  });
};

/**
 * Show the current curriculum
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var curriculum = req.curriculum ? req.curriculum.toJSON() : {};
  // Add a custom field to the Curriculum, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Curriculum model.
  curriculum.isCurrentUserOwner = !!(req.user && curriculum.user && curriculum.user._id.toString() === req.user._id.toString());

  res.json(curriculum);
};

/**
 * Update an curriculum
 */
exports.update = function (req, res) {
  var curriculum = req.curriculum;
  curriculum.user = req.body.user;
  curriculum.formations = req.body.formations;
  curriculum.experiences = req.body.experiences;
  curriculum.competences = req.body.competences;
  curriculum.techniques = req.body.techniques;
  curriculum.langues = req.body.langues;

  curriculum.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(curriculum);
    }
  });
};

/**
 * Delete an curriculum
 */
exports.delete = function (req, res) {
  var curriculum = req.curriculum;

  curriculum.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(curriculum);
    }
  });
};

/**
 * List of Curriculums
 */
exports.list = function (req, res) {
  Curriculum.find().sort('-created').populate('user', 'displayName').populate('techniques').populate('competences').populate('formations').populate('experiences').populate('langues').exec(function (err, curriculums) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(curriculums);
    }
  });
};

// ////////////// MIDDLEWARE ////////////////////
exports.curriculumByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Curriculum is invalid'
    });
  }
  Curriculum.findById(id).populate('user', 'displayName').populate('techniques').populate('competences').populate('formations').populate('experiences').populate('langues').exec(function (err, curriculum) {
    if (err) {
      return next(err);
    } else if (!curriculum) {
      return res.status(404).send({
        message: 'No curriculum with that identifier has been found'
      });
    }
    req.curriculum = curriculum;
    next();
  });
};


//////////////////////////GENERER UN PDF///////////////////////////

exports.generatePdf = function(req, res) {


  User.findById(req.params.userId)
    .populate('user')
    .populate('etablissement')
    .populate('fonction')
    .populate({
      path: 'cv',
      populate: {
        path:'competences techniques experiences formations langues',
      }
    })

    .exec(function (err, user) {
      var html = fs.readFileSync('./modules/curriculums/client/views/html-pdf.curriculum.client.view.html', 'utf8');
      var template = handlebars.compile(html);
      var result = template(user);

      pdf.create(result).toFile('./modules/curriculums/client/pdf/test2.pdf', function(error, result) {
        if (error) return console.log(error);
        res.json('./modules/curriculums/client/pdf/test2.pdf');
      });
  });

};



// exports.generatePdf = function(req, res){
//   var car = req.car;
//   var html = fs.readFileSync('./modules/cars/server/views/html-pdf.car.server.view.html', 'utf8');
//   var template = handlebars.compile(html);
//   var result = template(car);

//   pdf.create(result).toFile('./modules/cars/client/pdf/' + car._id + '.pdf', function(error, result) {
//     if (error) return console.log(error);
//     res.json('./modules/cars/client/pdf/' + car._id + '.pdf');
//   });
// };
