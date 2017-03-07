'use strict';

/**
 * Module dependencies
 */
var formationsPolicy = require('../policies/formations.server.policy'),
  formations = require('../controllers/formations.server.controller');

module.exports = function (app) {
  // Formations collection routes
  app.route('/api/formations').all(formationsPolicy.isAllowed)
    .get(formations.list)
    .post(formations.create);

  //Single formation routes
  app.route('/api/formations/:formationId').all(formationsPolicy.isAllowed)
    .get(formations.read)
    .put(formations.update)
    .delete(formations.delete);

  app.route('/api/formationsByConnectedUser').all(formationsPolicy.isAllowed)
    .get(formations.formationsByConnectedUser)
    .post(formations.create);

  //Single formation routes
  app.route('/api/formationsByConnectedUser/:formationId').all(formationsPolicy.isAllowed)
    .get(formations.read)
    .put(formations.update)
    .delete(formations.delete);


  // Finish by binding the formation middleware
  app.param('formationId', formations.formationByID);
};


