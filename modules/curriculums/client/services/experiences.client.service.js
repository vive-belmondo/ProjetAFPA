(function () {
  'use strict';

  angular
    .module('curriculums.services')
    .factory('ExperiencesService', ExperiencesService);

  ExperiencesService.$inject = ['$resource', '$log'];

  function ExperiencesService($resource, $log) {
    var Experience = $resource('/api/experiences/:experienceId', {
      experienceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Experience.prototype, {
      createOrUpdate: function () {
        var experience = this;
        return createOrUpdate(experience);
      }
    });

    return Experience;

    function createOrUpdate(experience) {
      if (experience._id) {
        return experience.$update(onSuccess, onError);
      } else {
        return experience.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(experience) {
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
