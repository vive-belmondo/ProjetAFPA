'use strict';

/**
 * Module dependencies
 */
var experiencesPolicy = require('../policies/experiences.server.policy'),
  experiences = require('../controllers/experiences.server.controller');

module.exports = function (app) {
  // Experiences collection routes
  app.route('/api/experiences').all(experiencesPolicy.isAllowed)
    .get(experiences.list)
    .post(experiences.create);

  //Single experience routes
  app.route('/api/experiences/:experienceId').all(experiencesPolicy.isAllowed)
    .get(experiences.read)
    .put(experiences.update)
    .delete(experiences.delete);

  app.route('/api/experiencesByConnectedUser').all(experiencesPolicy.isAllowed)
    .get(experiences.experiencesByConnectedUser)
    .post(experiences.create);

  //Single experience routes
  app.route('/api/experiencesByConnectedUser/:experienceId').all(experiencesPolicy.isAllowed)
    .get(experiences.read)
    .put(experiences.update)
    .delete(experiences.delete);


  // Finish by binding the experience middleware
  app.param('experienceId', experiences.experienceByID);
};


