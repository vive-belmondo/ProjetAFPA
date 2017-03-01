(function () {
  'use strict';

  angular
    .module('curriculums.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module
  function menuConfig(menuService) {
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Manage curriculums',
      state: 'curriculums.competences.list'
    });
  }
}());
