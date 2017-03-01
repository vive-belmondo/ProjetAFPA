(function (app) {
  'use strict';

  app.registerModule('curriculums');
  app.registerModule('curriculums.admin');
  app.registerModule('curriculums.admin.routes', ['ui.router', 'core.routes', 'curriculums.admin.services']);
  app.registerModule('curriculums.admin.services');
  app.registerModule('curriculums.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
