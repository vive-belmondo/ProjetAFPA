(function () {
  'use strict';

  angular
    .module('curriculums.services')
    .factory('FormationsByConnectedUserService', FormationsByConnectedUserService);

  FormationsByConnectedUserService.$inject = ['$resource', '$log'];

  function FormationsByConnectedUserService($resource, $log) {
    return $resource('/api/formationsByConnectedUser/:formationId', {
      formationId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
