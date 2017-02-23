'use strict';

/**
 * Module dependencies
 */
var etablissementsPolicy = require('../policies/etablissements.server.policy'),
  etablissements = require('../controllers/etablissements.server.controller');

module.exports = function (app) {
  // Etablissements collection routes
  app.route('/api/etablissements').all(etablissementsPolicy.isAllowed)
    .get(etablissements.list)
    .post(etablissements.create);

  // Single etablissement routes
  app.route('/api/etablissements/:etablissementId').all(etablissementsPolicy.isAllowed)
    .get(etablissements.read)
    .put(etablissements.update)
    .delete(etablissements.delete);

  // Finish by binding the etablissement middleware
  app.param('etablissementId', etablissements.etablissementByID);
};
