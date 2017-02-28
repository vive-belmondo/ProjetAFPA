(function () {
  'use strict';

  angular
    .module('competences.services')
    .factory('CompetencesService', CompetencesService);

  CompetencesService.$inject = ['$resource', '$log'];

  function CompetencesService($resource, $log) {
    var Competence = $resource('/api/competences/:competenceId', {
      competenceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Competence.prototype, {
      createOrUpdate: function () {
        var competence = this;
        return createOrUpdate(competence);
      }
    });

    return Competence;

    function createOrUpdate(competence) {
      if (competence._id) {
        return competence.$update(onSuccess, onError);
      } else {
        return competence.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(competence) {
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
