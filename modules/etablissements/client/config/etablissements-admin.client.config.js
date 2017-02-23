(function () {
  'use strict';

  // Configuring the Etablissements Admin module
  angular
    .module('etablissements.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Etablissements',
      state: 'admin.etablissements.list'
    });
  }
}());
