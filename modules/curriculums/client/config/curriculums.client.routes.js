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
      });
  }

  // getCompetence.$inject = ['$stateParams', 'CompetencesService'];

  // function getCompetence($stateParams, CompetencesService) {
  //   return CompetencesService.get({
  //     competenceId: $stateParams.competenceId
  //   }).$promise;
  // }

  // newCompetence.$inject = ['CompetencesService'];

  // function newCompetence(CompetencesService) {
  //   return new CompetencesService();
  // }
  
}());
