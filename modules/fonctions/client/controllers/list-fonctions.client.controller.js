(function () {
  'use strict';

  angular
    .module('fonctions')
    .controller('FonctionsListController', FonctionsListController);

  FonctionsListController.$inject = ['FonctionsService'];

  function FonctionsListController(FonctionsService) {
    var vm = this;

    vm.fonctions = FonctionsService.query();
  }
}());
