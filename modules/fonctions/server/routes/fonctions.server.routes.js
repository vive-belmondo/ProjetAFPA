'use strict';

/**
 * Module dependencies
 */
var fonctionsPolicy = require('../policies/fonctions.server.policy'),
  fonctions = require('../controllers/fonctions.server.controller');

module.exports = function (app) {
  // Fonctions collection routes
  app.route('/api/fonctions').all(fonctionsPolicy.isAllowed)
    .get(fonctions.list)
    .post(fonctions.create);

  // Single fonction routes
  app.route('/api/fonctions/:fonctionId').all(fonctionsPolicy.isAllowed)
    .get(fonctions.read)
    .put(fonctions.update)
    .delete(fonctions.delete);

  // Finish by binding the fonction middleware
  app.param('fonctionId', fonctions.fonctionByID);
};
