(function () {
  'use strict';

  angular
    .module('fonctions.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.fonctions', {
        abstract: true,
        url: '/fonctions',
        template: '<ui-view/>'
      })
      .state('admin.fonctions.list', {
        url: '',
        templateUrl: '/modules/fonctions/client/views/admin/list-fonctions.client.view.html',
        controller: 'FonctionsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          fonctionResolve: newFonction
        }
      })
      // .state('admin.fonctions.create', {
      //   url: '/create',
      //   templateUrl: '/modules/fonctions/client/views/admin/form-fonction.client.view.html',
      //   controller: 'FonctionsAdminController',
      //   controllerAs: 'vm',
      //   data: {
      //     roles: ['admin']
      //   },
      //   resolve: {
      //     fonctionResolve: newFonction
      //   }
      // })
      .state('admin.fonctions.edit', {
        url: '/:fonctionId/edit',
        templateUrl: '/modules/fonctions/client/views/admin/form-fonction.client.view.html',
        controller: 'FonctionsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          fonctionResolve: getFonction
        }
      });
  }

  getFonction.$inject = ['$stateParams', 'FonctionsService'];

  function getFonction($stateParams, FonctionsService) {
    return FonctionsService.get({
      fonctionId: $stateParams.fonctionId
    }).$promise;
  }

  newFonction.$inject = ['FonctionsService'];

  function newFonction(FonctionsService) {
    return new FonctionsService();
  }
}());
