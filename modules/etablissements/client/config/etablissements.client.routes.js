(function () {
  'use strict';

  angular
    .module('etablissements.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('etablissements', {
        abstract: true,
        url: '/etablissements',
        template: '<ui-view/>'
      })
      .state('etablissements.list', {
        url: '',
        templateUrl: '/modules/etablissements/client/views/list-etablissements.client.view.html',
        controller: 'EtablissementsAdminListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Etablissements List'
        }
      })
      .state('etablissements.view', {
        url: '/:etablissementId',
        templateUrl: '/modules/etablissements/client/views/view-etablissement.client.view.html',
        controller: 'EtablissementsController',
        controllerAs: 'vm',
        resolve: {
          etablissementResolve: getEtablissement
        },
        data: {
          pageTitle: 'Etablissement {{ etablissementResolve.title }}'
        }
      });
  }

  getEtablissement.$inject = ['$stateParams', 'EtablissementsService'];

  function getEtablissement($stateParams, EtablissementsService) {
    return EtablissementsService.get({
      etablissementId: $stateParams.etablissementId
    }).$promise;
  }
}());
