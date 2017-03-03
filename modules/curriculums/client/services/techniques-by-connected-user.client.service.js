(function () {
  'use strict';

  angular
    .module('curriculums.services')
    .factory('TechniquesByConnectedUserService', TechniquesByConnectedUserService);

  TechniquesByConnectedUserService.$inject = ['$resource', '$log'];

  function TechniquesByConnectedUserService($resource, $log) {
    return $resource('/api/techniquesByConnectedUser/:techniqueId', {
      techniqueId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
