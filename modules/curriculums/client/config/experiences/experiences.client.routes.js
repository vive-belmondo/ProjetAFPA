(function () {
  'use strict';

  angular
    .module('curriculums.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('curriculums.experiences', {
        abstract: true,
        url: '/experiences',
        template: '<ui-view/>'
      })
      .state('curriculums.experiences.list', {
        url: '/:idUser/list',
        templateUrl: '/modules/curriculums/client/views/experiences/list-experiences.client.view.html',
        controller: 'ExperiencesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'experiences'
        },
        resolve: {
          experienceResolve: newExperience
        }
      })
      .state('curriculums.experiences.view', {
        url: '/:experienceId',
        templateUrl: '/modules/curriculums/client/views/experiences/view-experience.client.view.html',
        controller: 'ExperiencesController',
        controllerAs: 'vm',
        resolve: {
          experienceResolve: getExperience
        },
        data: {
          pageTitle: 'Experience {{ experienceResolve.title }}'
        }
      })
      .state('curriculums.experiences.edit', {
        url: '/:experienceId/edit',
        templateUrl: '/modules/curriculums/client/views/experiences/form-experience.client.view.html',
        controller: 'ExperiencesController',
        controllerAs: 'vm',
        resolve: {
          experienceResolve: getExperience
        }
      });
  }

  getExperience.$inject = ['$stateParams', 'ExperiencesService'];

  function getExperience($stateParams, ExperiencesService) {
    return ExperiencesService.get({
      experienceId: $stateParams.experienceId
    }).$promise;
  }

  newExperience.$inject = ['ExperiencesService'];

  function newExperience(ExperiencesService) {
    return new ExperiencesService();
  }
}());
