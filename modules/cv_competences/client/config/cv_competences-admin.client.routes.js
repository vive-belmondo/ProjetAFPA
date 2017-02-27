(function () {
  'use strict';

  angular
    .module('cv_competences.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.cv_competences', {
        abstract: true,
        url: '/cv_competences',
        template: '<ui-view/>'
      })
      .state('admin.cv_competences.list', {
        url: '',
        templateUrl: '/modules/cv_competences/client/views/admin/list-cv_competences.client.view.html',
        controller: 'cv_CompetencesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          cv_competenceResolve: newcv_Competence
        }
      })
      // .state('admin.cv_competences.create', {
      //   url: '/create',
      //   templateUrl: '/modules/cv_competences/client/views/admin/form-cv_competence.client.view.html',
      //   controller: 'cv_CompetencesAdminController',
      //   controllerAs: 'vm',
      //   data: {
      //     roles: ['admin']
      //   },
      //   resolve: {
      //     cv_competenceResolve: newcv_Competence
      //   }
      // })
      .state('admin.cv_competences.edit', {
        url: '/:cv_competenceId/edit',
        templateUrl: '/modules/cv_competences/client/views/admin/form-cv_competence.client.view.html',
        controller: 'cv_CompetencesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          cv_competenceResolve: getcv_Competence
        }
      });
  }

  getcv_Competence.$inject = ['$stateParams', 'cv_CompetencesService'];

  function getcv_Competence($stateParams, cv_CompetencesService) {
    return cv_CompetencesService.get({
      cv_competenceId: $stateParams.cv_competenceId
    }).$promise;
  }

  newcv_Competence.$inject = ['cv_CompetencesService'];

  function newcv_Competence(cv_CompetencesService) {
    return new cv_CompetencesService();
  }
}());
