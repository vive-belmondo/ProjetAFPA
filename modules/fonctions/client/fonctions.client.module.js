(function (app) {
  'use strict';

  app.registerModule('fonctions', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('fonctions.admin', ['core.admin']);
  app.registerModule('fonctions.admin.routes', ['core.admin.routes']);
  app.registerModule('fonctions.services');
  app.registerModule('fonctions.routes', ['ui.router', 'core.routes', 'fonctions.services']);
}(ApplicationConfiguration));
