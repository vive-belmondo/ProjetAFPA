'use strict';

/**
 * Module dependencies
 */
var techniquesPolicy = require('../policies/techniques.server.policy'),
  techniques = require('../controllers/techniques.server.controller');

module.exports = function (app) {
  // Techniques collection routes
  app.route('/api/techniques').all(techniquesPolicy.isAllowed)
    .get(techniques.list)
    .post(techniques.create);

  // Single technique routes
  app.route('/api/techniques/:techniqueId').all(techniquesPolicy.isAllowed)
    .get(techniques.read)
    .put(techniques.update)
    .delete(techniques.delete);

  // Finish by binding the technique middleware
  app.param('techniqueId', techniques.techniqueByID);
};
