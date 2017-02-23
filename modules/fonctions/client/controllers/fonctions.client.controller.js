(function () {
  'use strict';

  angular
    .module('fonctions')
    .controller('FonctionsController', FonctionsController);

  FonctionsController.$inject = ['$scope', 'fonctionResolve', 'Authentication'];

  function FonctionsController($scope, fonction, Authentication) {
    var vm = this;

    vm.fonction = fonction;
    vm.authentication = Authentication;

  }
}());
