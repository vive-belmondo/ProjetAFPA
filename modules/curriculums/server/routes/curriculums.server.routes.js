'use strict';

/**
 * Module dependencies
 */
var curriculumsPolicy = require('../policies/curriculums.server.policy'),
  curriculums = require('../controllers/curriculums.server.controller');

module.exports = function (app) {
  // Curriculums collection routes

  
  app.route('/api/curriculums/pdf/:userId')
    .get(curriculums.generatePdf);


  app.route('/api/curriculums').all(curriculumsPolicy.isAllowed)
    .get(curriculums.list)
    .post(curriculums.create);

  //Single curriculum routes
  app.route('/api/curriculums/:curriculumId').all(curriculumsPolicy.isAllowed)
    .get(curriculums.read)
    .put(curriculums.update)
    .delete(curriculums.delete);

  // Finish by binding the curriculum middleware
  app.param('curriculumId', curriculums.curriculumByID);
};
