(function (app) {
  'use strict';

  app.registerModule('competences', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('competences.admin', ['core.admin']);
  app.registerModule('competences.admin.routes', ['core.admin.routes']);
  app.registerModule('competences.services');
  app.registerModule('competences.routes', ['ui.router', 'core.routes', 'competences.services']);
}(ApplicationConfiguration));
