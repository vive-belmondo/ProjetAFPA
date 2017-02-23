(function () {
  'use strict';

  angular
    .module('fonctions')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Marques',
      state: 'fonctions',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'fonctions', {
      title: 'Liste des Marques',
      state: 'fonctions.list',
      roles: ['*']
    });
  }
}());
