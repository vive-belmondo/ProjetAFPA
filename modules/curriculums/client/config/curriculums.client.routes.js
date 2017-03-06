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
        data: {
          pageTitle: 'Aperçu du CV'
        }
      });
  }
}());
