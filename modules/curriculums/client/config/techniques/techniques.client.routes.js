(function () {
  'use strict';

  angular
    .module('curriculums.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('curriculums.techniques', {
        abstract: true,
        url: '/techniques',
        template: '<ui-view/>'
      })
      .state('curriculums.techniques.list', {
        url: '',
        templateUrl: '/modules/curriculums/client/views/techniques/list-techniques.client.view.html',
        controller: 'TechniquesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'techniques'
        },
        resolve: {
          techniqueResolve: newTechnique
        }
      })
      // .state('curriculums.techniques.view', {
      //   url: '/:techniqueId',
      //   templateUrl: '/modules/curriculums/client/views/techniques/view-technique.client.view.html',
      //   controller: 'TechniquesController',
      //   controllerAs: 'vm',
      //   resolve: {
      //     techniqueResolve: getTechnique
      //   },
      //   data: {
      //     pageTitle: 'Technique {{ techniqueResolve.title }}'
      //   }
      // })
      .state('curriculums.techniques.edit', {
        url: '/:techniqueId/edit',
        templateUrl: '/modules/curriculums/client/views/techniques/form-technique.client.view.html',
        controller: 'TechniquesController',
        controllerAs: 'vm',
        resolve: {
          techniqueResolve: getTechnique
        }
      });
  }

  getTechnique.$inject = ['$stateParams', 'TechniquesService'];

  function getTechnique($stateParams, TechniquesService) {
    return TechniquesService.get({
      techniqueId: $stateParams.techniqueId
    }).$promise;
  }

  newTechnique.$inject = ['TechniquesService'];

  function newTechnique(TechniquesService) {
    return new TechniquesService();
  }
}());
