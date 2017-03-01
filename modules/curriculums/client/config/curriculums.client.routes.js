(function () {
  'use strict';

  // Setting up route
  angular
    .module('curriculums.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Users state routing
    $stateProvider
      .state('curriculums', {
        // abstract: true,
        url: '/curriculums',
        templateUrl: '/modules/curriculums/client/views/menu-cv.client.view.html',
        controller: 'CurriculumsController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('curriculums.create', {
        url: '/curriculums/create',
        templateUrl: '/modules/competences/client/views/admin/list-competences.client.view.html',
        controller: 'CompetencesAdminListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'competences'
        }
      });
  }
}());
