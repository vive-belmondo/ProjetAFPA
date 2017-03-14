(function () {
  'use strict';

  angular
    .module('core.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      })
        .state('admin.cv', {
        url: '/list',
        templateUrl: '/modules/curriculums/client/views/list-cv.client.view.html',
        controller: 'ListCvController',
        controllerAs: 'vm',
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
