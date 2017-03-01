(function () {
  'use strict';

  // Configuring the Competences Admin module
  angular
    .module('curriculums.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Competences',
      state: 'admin.competences.list'
    });
  }
}());
