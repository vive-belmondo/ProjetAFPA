'use strict';

/**
 * Module dependencies
 */
var languesPolicy = require('../policies/langues.server.policy'),
  langues = require('../controllers/langues.server.controller');

module.exports = function (app) {
  // Competences collection routes
  app.route('/api/langues').all(languesPolicy.isAllowed)
    .get(langues.list)
    .post(langues.create);

  //Single langue routes
  app.route('/api/langues/:langueId').all(languesPolicy.isAllowed)
    .get(langues.read)
    .put(langues.update)
    .delete(langues.delete);

  app.route('/api/languesByConnectedUser').all(languesPolicy.isAllowed)
    .get(langues.languesByConnectedUser)
    .post(langues.create);

  //Single langue routes
  app.route('/api/languesByConnectedUser/:langueId').all(languesPolicy.isAllowed)
    .get(langues.read)
    .put(langues.update)
    .delete(langues.delete);


  // Finish by binding the langue middleware
  app.param('langueId', langues.langueByID);
};


