(function () {
  'use strict';

  angular
    .module('curriculums.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('curriculums.langues', {
        abstract: true,
        url: '/langues',
        template: '<ui-view/>'
      })
      .state('curriculums.langues.list', {
        url: '/list',
        templateUrl: '/modules/curriculums/client/views/langues/list-langues.client.view.html',
        controller: 'LanguesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'langues'
        },
        resolve: {
          langueResolve: newLangue
        }
      })
      .state('curriculums.langues.edit', {
        url: '/:langueId/edit',
        templateUrl: '/modules/curriculums/client/views/langues/form-langue.client.view.html',
        controller: 'LanguesController',
        controllerAs: 'vm',
        resolve: {
          langueResolve: getLangue
        }

      });
  }

  getLangue.$inject = ['$stateParams', 'LanguesService'];

  function getLangue($stateParams, LanguesService) {
    return LanguesService.get({
      langueId: $stateParams.langueId
    }).$promise;
  }

  newLangue.$inject = ['LanguesService'];

  function newLangue(LanguesService) {
    return new LanguesService();
  }
}());
