(function () {
  'use strict';

  angular
    .module('curriculums.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('curriculums.formations', {
        abstract: true,
        url: '/formations',
        template: '<ui-view/>'
      })
      .state('curriculums.formations.list', {
        url: '/list',
        templateUrl: '/modules/curriculums/client/views/formations/list-formations.client.view.html',
        controller: 'FormationsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'formations'
        },
        resolve: {
          formationResolve: newFormation
        }
      })
      .state('curriculums.formations.view', {
        url: '/:formationId',
        templateUrl: '/modules/curriculums/client/views/formations/view-formation.client.view.html',
        controller: 'FormationsController',
        controllerAs: 'vm',
        resolve: {
          formationResolve: getFormation
        },
        data: {
          pageTitle: 'Formation {{ formationResolve.title }}'
        }
      })
      .state('curriculums.formations.edit', {
        url: '/:formationId/edit',
        templateUrl: '/modules/curriculums/client/views/formations/form-formation.client.view.html',
        controller: 'FormationsController',
        controllerAs: 'vm',
        resolve: {
          formationResolve: getFormation
        }
      });
  }

  getFormation.$inject = ['$stateParams', 'FormationsService'];

  function getFormation($stateParams, FormationsService) {
    return FormationsService.get({
      formationId: $stateParams.formationId
    }).$promise;
  }

  newFormation.$inject = ['FormationsService'];

  function newFormation(FormationsService) {
    return new FormationsService();
  }
}());
