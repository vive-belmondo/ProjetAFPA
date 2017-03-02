(function () {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenu('account', {
      roles: ['user']
    });

    menuService.addMenuItem('account', {
      title: '',
      state: 'settings',
      type: 'dropdown',
      roles: ['user']
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Modifier votre profil',
      state: 'settings.profile',
      roles: ['admin']
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Modifier votre photo',
      state: 'settings.picture',
      roles: ['admin']
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Changer votre mot de passe',
      state: 'settings.password'
    });
  }
}());
