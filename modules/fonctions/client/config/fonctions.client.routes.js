(function () {
  'use strict';

  angular
    .module('fonctions.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('fonctions', {
        abstract: true,
        url: '/fonctions',
        template: '<ui-view/>'
      })
      .state('fonctions.list', {
        url: '',
        templateUrl: '/modules/fonctions/client/views/list-fonctions.client.view.html',
        controller: 'FonctionsAdminListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Fonctions List'
        }
      })
      .state('fonctions.view', {
        url: '/:fonctionId',
        templateUrl: '/modules/fonctions/client/views/view-fonction.client.view.html',
        controller: 'FonctionsController',
        controllerAs: 'vm',
        resolve: {
          fonctionResolve: getFonction
        },
        data: {
          pageTitle: 'Fonction {{ fonctionResolve.title }}'
        }
      });
  }

  getFonction.$inject = ['$stateParams', 'FonctionsService'];

  function getFonction($stateParams, FonctionsService) {
    return FonctionsService.get({
      fonctionId: $stateParams.fonctionId
    }).$promise;
  }
}());
