(function () {
  'use strict';

  angular
    .module('curriculums.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.competences', {
        abstract: true,
        url: '/competences',
        template: '<ui-view/>'
      })
      .state('admin.competences.list', {
        url: '',
        templateUrl: '/modules/curriculums/client/views/competences/admin/list-competences.client.view.html',
        controller: 'CompetencesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          competenceResolve: newCompetence
        }
      })
      // .state('admin.competences.create', {
      //   url: '/create',
      //   templateUrl: '/modules/competences/client/views/admin/form-competence.client.view.html',
      //   controller: 'CompetencesAdminController',
      //   controllerAs: 'vm',
      //   data: {
      //     roles: ['admin']
      //   },
      //   resolve: {
      //     competenceResolve: newCompetence
      //   }
      // })
      .state('admin.competences.edit', {
        url: '/:competenceId/edit',
        templateUrl: '/modules/curriculums/client/views/competences/admin/form-competence.client.view.html',
        controller: 'CompetencesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
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
