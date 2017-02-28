'use strict';

/**
 * Module dependencies
 */
var competencesPolicy = require('../policies/competences.server.policy'),
  competences = require('../controllers/competences.server.controller');

module.exports = function (app) {
  // Competences collection routes
  app.route('/api/competences').all(competencesPolicy.isAllowed)
    .get(competences.list)
    .post(competences.create);

  // Single competence routes
  app.route('/api/competences/:competenceId').all(competencesPolicy.isAllowed)
    .get(competences.read)
    .put(competences.update)
    .delete(competences.delete);

  // Finish by binding the competence middleware
  app.param('competenceId', competences.competenceByID);
};
