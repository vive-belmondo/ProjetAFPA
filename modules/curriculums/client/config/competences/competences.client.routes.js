(function () {
  'use strict';

  angular
    .module('curriculums.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('curriculums.competences', {
        abstract: true,
        url: '/competences',
        template: '<ui-view/>'
      })
      .state('curriculums.competences.list', {
        url: '/:idUser/list',
        templateUrl: '/modules/curriculums/client/views/competences/list-competences.client.view.html',
        controller: 'CompetencesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'competences'
        },
        resolve: {
          competenceResolve: newCompetence
        }
      })
      .state('curriculums.competences.view', {
        url: '/:competenceId',
        templateUrl: '/modules/curriculums/client/views/competences/view-competence.client.view.html',
        controller: 'CompetencesController',
        controllerAs: 'vm',
        resolve: {
          competenceResolve: getCompetence
        },
        data: {
          pageTitle: 'Competence {{ competenceResolve.title }}'
        }
      })
      .state('curriculums.competences.edit', {
        url: '/:competenceId/edit',
        templateUrl: '/modules/curriculums/client/views/competences/form-competence.client.view.html',
        controller: 'CompetencesController',
        controllerAs: 'vm',
        resolve: {
          competenceResolve: getCompetence
        }
      });
  }

  getCompetence.$inject = ['$stateParams', 'CompetencesService'];

  function getCompetence($stateParams, CompetencesService) {
    return CompetencesService.get({
      competenceId: $stateParams.competenceId
    }).$promise;
  }

  newCompetence.$inject = ['CompetencesService'];

  function newCompetence(CompetencesService) {
    return new CompetencesService();
  }
}());
