(function () {
  'use strict';

  angular
    .module('curriculums.services')
    .factory('LanguesByConnectedUserService', LanguesByConnectedUserService);

  LanguesByConnectedUserService.$inject = ['$resource', '$log'];

  function LanguesByConnectedUserService($resource, $log) {
    return $resource('/api/languesByConnectedUser/:langueId', {
      langueId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
