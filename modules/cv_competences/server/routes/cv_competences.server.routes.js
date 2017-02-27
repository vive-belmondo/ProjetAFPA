'use strict';

/**
 * Module dependencies
 */
var cv_competencesPolicy = require('../policies/cv_competences.server.policy'),
  cv_competences = require('../controllers/cv_competences.server.controller');

module.exports = function (app) {
  // cv_Competences collection routes
  app.route('/api/cv_competences').all(cv_competencesPolicy.isAllowed)
    .get(cv_competences.list)
    .post(cv_competences.create);

  // Single cv_competence routes
  app.route('/api/cv_competences/:cv_competenceId').all(cv_competencesPolicy.isAllowed)
    .get(cv_competences.read)
    .put(cv_competences.update)
    .delete(cv_competences.delete);

  // Finish by binding the cv_competence middleware
  app.param('cv_competenceId', cv_competences.cv_competenceByID);
};
