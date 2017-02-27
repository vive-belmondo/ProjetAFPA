(function () {
  'use strict';

  angular
    .module('cv_competences.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('cv_competences', {
        abstract: true,
        url: '/cv_competences',
        template: '<ui-view/>'
      })
      .state('cv_competences.list', {
        url: '',
        templateUrl: '/modules/cv_competences/client/views/list-cv_competences.client.view.html',
        controller: 'cv_CompetencesAdminListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'cv_Competences List'
        }
      })
      .state('cv_competences.view', {
        url: '/:cv_competenceId',
        templateUrl: '/modules/cv_competences/client/views/view-cv_competence.client.view.html',
        controller: 'cv_CompetencesController',
        controllerAs: 'vm',
        resolve: {
          cv_competenceResolve: getcv_Competence
        },
        data: {
          pageTitle: 'cv_Competence {{ cv_competenceResolve.title }}'
        }
      });
  }

  getcv_Competence.$inject = ['$stateParams', 'cv_CompetencesService'];

  function getcv_Competence($stateParams, cv_CompetencesService) {
    return cv_CompetencesService.get({
      cv_competenceId: $stateParams.cv_competenceId
    }).$promise;
  }
}());
