(function () {
  'use strict';

  angular
    .module('curriculums.services')
    .factory('CompetencesByConnectedUserService', CompetencesByConnectedUserService);

  CompetencesByConnectedUserService.$inject = ['$resource', '$log'];

  function CompetencesByConnectedUserService($resource, $log) {
    return $resource('/api/competencesByConnectedUser/:competenceId', {
      competenceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
