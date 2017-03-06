(function () {
  'use strict';

  angular
    .module('curriculums.services')
    .factory('LanguesService', LanguesService);

  LanguesService.$inject = ['$resource', '$log'];

  function LanguesService($resource, $log) {
    var Langue = $resource('/api/langues/:langueId', {
      langueId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Langue.prototype, {
      createOrUpdate: function () {
        var langue = this;
        return createOrUpdate(langue);
      }
    });

    return Langue;

    function createOrUpdate(langue) {
      if (langue._id) {
        return langue.$update(onSuccess, onError);
      } else {
        return langue.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(langue) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
