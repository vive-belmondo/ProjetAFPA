(function () {
  'use strict';

  angular
    .module('competences.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('competences', {
        abstract: true,
        url: '/competences',
        template: '<ui-view/>'
      })
      .state('competences.list', {
        url: '',
        templateUrl: '/modules/competences/client/views/list-competences.client.view.html',
        controller: 'CompetencesAdminListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Competences List'
        }
      })
      .state('competences.view', {
        url: '/:competenceId',
        templateUrl: '/modules/competences/client/views/view-competence.client.view.html',
        controller: 'CompetencesController',
        controllerAs: 'vm',
        resolve: {
          competenceResolve: getCompetence
        },
        data: {
          pageTitle: 'Competence {{ competenceResolve.title }}'
        }
      });
  }

  getCompetence.$inject = ['$stateParams', 'CompetencesService'];

  function getCompetence($stateParams, CompetencesService) {
    return CompetencesService.get({
      competenceId: $stateParams.competenceId
    }).$promise;
  }
}());