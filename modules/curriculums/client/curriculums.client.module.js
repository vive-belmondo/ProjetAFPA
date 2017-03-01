(function (app) {
  'use strict';

  app.registerModule('curriculums');
  app.registerModule('curriculums.admin');
  app.registerModule('curriculums.admin.routes', ['ui.router', 'core.routes', 'curriculums.admin.services']);
  app.registerModule('curriculums.admin.services');
  app.registerModule('curriculums.services');
  app.registerModule('curriculums.routes', ['ui.router', 'core.routes']);

/// competences
  // app.registerModule('competences', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  // app.registerModule('competences.admin', ['core.admin']);
  // app.registerModule('competences.admin.routes', ['core.admin.routes']);
  // app.registerModule('competences.services');
  // app.registerModule('competences.routes', ['ui.router', 'core.routes', 'competences.services']);





}(ApplicationConfiguration));
