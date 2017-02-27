(function (app) {
  'use strict';

  app.registerModule('cv_competences', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('cv_competences.admin', ['core.admin']);
  app.registerModule('cv_competences.admin.routes', ['core.admin.routes']);
  app.registerModule('cv_competences.services');
  app.registerModule('cv_competences.routes', ['ui.router', 'core.routes', 'cv_competences.services']);
}(ApplicationConfiguration));
