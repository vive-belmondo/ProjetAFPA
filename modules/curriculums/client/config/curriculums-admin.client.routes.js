(function () {
  'use strict';

  // Setting up route
  angular
    .module('curriculums.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.curriculums', {
        url: '/curriculums',
        templateUrl: '/modules/curriculums/client/views/admin/list-curriculums.client.view.html',
        controller: 'CurriculumsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'curriculums List'
        }
      });

    getUser.$inject = ['$stateParams', 'AdminService'];

    function getUser($stateParams, AdminService) {
      return AdminService.get({
        userId: $stateParams.userId
      }).$promise;
    }
  }
}());
