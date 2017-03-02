(function () {
  'use strict';

  angular
    .module('core.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // menuService.addMenuItem('topbar', {
    //   title: 'Admin',
    //   state: 'admin',
    //   type: 'dropdown',
    //   roles: ['admin']
    // });
    menuService.addMenuItem('topbar', {
      title: 'Collaborateur',
      state: 'admin.users',
      roles: ['admin']
    });
    menuService.addMenuItem('topbar', {
      title: 'Etablissement',
      state: 'admin.etablissements.list',
      roles: ['admin']
    });
    menuService.addMenuItem('topbar', {
      title: 'Fonction',
      state: 'admin.fonctions.list',
      roles: ['admin']
    });
    menuService.addMenuItem('topbar', {
      title: 'Liste des CVs',
      state: '',
      roles: ['admin']
    });
    menuService.addMenuItem('topbar', {
      title: 'Module CV',
      state: 'curriculums.competences.list',
      roles: ['*']
    });
  }
}());
