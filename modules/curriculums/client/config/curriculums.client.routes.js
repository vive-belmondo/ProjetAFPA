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
        abstract: true,
        url: '/curriculums',
        templateUrl: '/modules/curriculums/client/views/menu-cv.client.view.html'
      })
      .state('curriculums.apercu', {
        url: '',
        templateUrl: '/modules/curriculums/client/views/apercu.client.view.html',
        controller: 'CurriculumsController',
        controllerAs: 'vm',
        resolve: {
          cvResolve: newCurriculum
        },
        data: {
          pageTitle: 'Aperçu du CV'
        }
      })
      .state('curriculums.cv', {
        url: '/list',
        templateUrl: '/modules/curriculums/client/views/list-cv.client.view.html',
        controller: 'CurriculumsController',
        controllerAs: 'vm',
        resolve: {
          cvResolve: newCurriculum
        },
        data: {
          pageTitle: 'Liste des CV'
        }
      });

    newCurriculum.$inject = ['CurriculumsService'];
      function newCurriculum(CurriculumsService) {
    return new CurriculumsService();
  }
  }
}());
