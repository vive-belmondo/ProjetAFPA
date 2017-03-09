(function () {
  'use strict';

  angular
    .module('etablissements.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.etablissements', {
        abstract: true,
        url: '/etablissements',
        template: '<ui-view/>'
      })
      .state('admin.etablissements.list', {
        url: '',
        templateUrl: '/modules/etablissements/client/views/admin/list-etablissements.client.view.html',
        controller: 'EtablissementsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'user']
        }
      })
      .state('admin.etablissements.create', {
        url: '/create',
        templateUrl: '/modules/etablissements/client/views/admin/form-etablissement.client.view.html',
        controller: 'EtablissementsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          etablissementResolve: newEtablissement
        }
      })
      .state('admin.etablissements.edit', {
        url: '/:etablissementId/edit',
        templateUrl: '/modules/etablissements/client/views/admin/form-etablissement.client.view.html',
        controller: 'EtablissementsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          etablissementResolve: getEtablissement
        }
      });
  }

  getEtablissement.$inject = ['$stateParams', 'EtablissementsService'];

  function getEtablissement($stateParams, EtablissementsService) {
    return EtablissementsService.get({
      etablissementId: $stateParams.etablissementId
    }).$promise;
  }

  newEtablissement.$inject = ['EtablissementsService'];

  function newEtablissement(EtablissementsService) {
    return new EtablissementsService();
  }
}());
