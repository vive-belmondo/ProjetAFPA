(function () {
  'use strict';

  angular
    .module('etablissements.services')
    .factory('EtablissementsService', EtablissementsService);

  EtablissementsService.$inject = ['$resource', '$log'];

  function EtablissementsService($resource, $log) {
    var Etablissement = $resource('/api/etablissements/:etablissementId', {
      etablissementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Etablissement.prototype, {
      createOrUpdate: function () {
        var etablissement = this;
        return createOrUpdate(etablissement);
      }
    });

    return Etablissement;

    function createOrUpdate(etablissement) {
      if (etablissement._id) {
        return etablissement.$update(onSuccess, onError);
      } else {
        return etablissement.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(etablissement) {
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

    function enlevePremiereLettre(chaine){
      chaine = chaine.substring(1);
      return chaine;
    }
    
  }
}());
