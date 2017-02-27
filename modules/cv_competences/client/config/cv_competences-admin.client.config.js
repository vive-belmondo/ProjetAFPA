(function () {
  'use strict';

  // Configuring the cv_Competences Admin module
  angular
    .module('cv_competences.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage cv_Competences',
      state: 'admin.cv_competences.list'
    });
  }
}());
