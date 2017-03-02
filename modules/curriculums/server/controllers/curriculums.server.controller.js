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
  validator = require('validator');




// ////////////// MIDDLEWARE ////////////////////
exports.curriculumByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Curriculum is invalid'
    });
  }
  Curriculum.findById(id).populate('user', 'displayName').populate('fonction').populate('etablissement').exec(function (err, curriculum) {
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

exports.generatePdf = function(req, res){
  var curriculum = req.curriculum;
  var html = fs.readFileSync('./modules/curriculums/client/views/html-pdf.curriculum.client.view.html', 'utf8');
  var template = handlebars.compile(html);
  var result = template(curriculum);

  pdf.create(result).toFile('./modules/curriculums/client/pdf/' + curriculum._id + '.pdf', function(error, result) {
    if (error) return console.log(error);
    res.json('./modules/curriculums/client/pdf/' + curriculum._id + '.pdf');
  });
};
