(function () {
  'use strict';

  angular
    .module('curriculums.services')
    .factory('FormationsService', FormationsService);

  FormationsService.$inject = ['$resource', '$log'];

  function FormationsService($resource, $log) {
    var Formation = $resource('/api/formations/:formationId', {
      formationId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Formation.prototype, {
      createOrUpdate: function () {
        var formation = this;
        return createOrUpdate(formation);
      }
    });

    return Formation;

    function createOrUpdate(formation) {
      if (formation._id) {
        return formation.$update(onSuccess, onError);
      } else {
        return formation.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(formation) {
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
