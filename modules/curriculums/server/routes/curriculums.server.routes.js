'use strict';

/**
 * Module dependencies
 */
var curriculumsPolicy = require('../policies/curriculums.server.policy'),
  curriculums = require('../controllers/curriculums.server.controller');

module.exports = function (app) {
  // Curriculums collection routes

  
  app.route('/api/curriculums/pdf/:curriculumId')
    .get(curriculums.generatePdf);

  // Finish by binding the curriculum middleware
  app.param('curriculumId', curriculums.curriculumByID);
};
