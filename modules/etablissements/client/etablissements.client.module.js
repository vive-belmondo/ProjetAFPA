(function (app) {
  'use strict';

  app.registerModule('etablissements', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('etablissements.admin', ['core.admin']);
  app.registerModule('etablissements.admin.routes', ['core.admin.routes']);
  app.registerModule('etablissements.services');
  app.registerModule('etablissements.routes', ['ui.router', 'core.routes', 'etablissements.services']);
}(ApplicationConfiguration));
