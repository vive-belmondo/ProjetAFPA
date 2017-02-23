(function () {
  'use strict';

  angular
    .module('fonctions.services')
    .factory('FonctionsService', FonctionsService);

  FonctionsService.$inject = ['$resource', '$log'];

  function FonctionsService($resource, $log) {
    var Fonction = $resource('/api/fonctions/:fonctionId', {
      fonctionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Fonction.prototype, {
      createOrUpdate: function () {
        var fonction = this;
        return createOrUpdate(fonction);
      }
    });

    return Fonction;

    function createOrUpdate(fonction) {
      if (fonction._id) {
        return fonction.$update(onSuccess, onError);
      } else {
        return fonction.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(fonction) {
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
