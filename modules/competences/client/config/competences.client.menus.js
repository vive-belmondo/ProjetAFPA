// (function () {
//   'use strict';

//   angular
//     .module('competences')
//     .run(menuConfig);

//   menuConfig.$inject = ['menuService'];

//   function menuConfig(menuService) {
//     menuService.addMenuItem('topbar', {
//       title: 'Competences',
//       state: 'competences',
//       type: 'dropdown',
//       roles: ['*']
//     });

//     // Add the dropdown list item
//     menuService.addSubMenuItem('topbar', 'competences', {
//       title: 'Liste des Competences',
//       state: 'competences.list',
//       roles: ['*']
//     });
//   }
// }());
