(function () {
  'use strict';

  angular
    .module('cv_competences.services')
    .factory('cv_CompetencesService', cv_CompetencesService);

  cv_CompetencesService.$inject = ['$resource', '$log'];

  function cv_CompetencesService($resource, $log) {
    var cv_Competence = $resource('/api/cv_competences/:cv_competenceId', {
      cv_competenceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(cv_Competence.prototype, {
      createOrUpdate: function () {
        var cv_competence = this;
        return createOrUpdate(cv_competence);
      }
    });

    return cv_Competence;

    function createOrUpdate(cv_competence) {
      if (cv_competence._id) {
        return cv_competence.$update(onSuccess, onError);
      } else {
        return cv_competence.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(cv_competence) {
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
