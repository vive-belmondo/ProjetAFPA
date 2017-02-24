// (function () {
//   'use strict';

//   angular
//     .module('fonctions')
//     .run(menuConfig);

//   menuConfig.$inject = ['menuService'];

//   function menuConfig(menuService) {
//     menuService.addMenuItem('topbar', {
//       title: 'Fonctions',
//       state: 'fonctions',
//       type: 'dropdown',
//       roles: ['*']
//     });

//     // Add the dropdown list item
//     menuService.addSubMenuItem('topbar', 'fonctions', {
//       title: 'Liste des Fonctions',
//       state: 'fonctions.list',
//       roles: ['*']
//     });
//   }
// }());
