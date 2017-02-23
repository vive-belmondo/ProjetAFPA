(function () {
  'use strict';

  angular
    .module('etablissements')
    .controller('EtablissementsController', EtablissementsController);

  EtablissementsController.$inject = ['$scope', 'etablissementResolve', 'Authentication'];

  function EtablissementsController($scope, etablissement, Authentication) {
    var vm = this;

    vm.etablissement = etablissement;
    vm.authentication = Authentication;

  }
}());
