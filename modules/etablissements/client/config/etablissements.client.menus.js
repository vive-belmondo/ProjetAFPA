(function () {
  'use strict';

  angular
    .module('etablissements')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Etablissements',
      state: 'etablissements',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'etablissements', {
      title: 'Liste des etablissements',
      state: 'etablissements.list',
      roles: ['*']
    });
  }
}());
