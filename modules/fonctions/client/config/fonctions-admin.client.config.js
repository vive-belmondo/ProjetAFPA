(function () {
  'use strict';

  // Configuring the Fonctions Admin module
  angular
    .module('fonctions.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Fonctions',
      state: 'admin.fonctions.list'
    });
  }
}());
