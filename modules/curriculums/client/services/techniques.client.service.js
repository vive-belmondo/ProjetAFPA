(function () {
  'use strict';

  angular
    .module('curriculums.services')
    .factory('TechniquesService', TechniquesService);

  TechniquesService.$inject = ['$resource', '$log'];

  function TechniquesService($resource, $log) {
    var Technique = $resource('/api/techniques/:techniqueId', {
      techniqueId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Technique.prototype, {
      createOrUpdate: function () {
        var technique = this;
        return createOrUpdate(technique);
      }
    });

    return Technique;

    function createOrUpdate(technique) {
      if (technique._id) {
        return technique.$update(onSuccess, onError);
      } else {
        return technique.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(technique) {
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
