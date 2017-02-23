(function () {
  'use strict';

  angular
    .module('etablissements')
    .controller('EtablissementsListController', EtablissementsListController);

  EtablissementsListController.$inject = ['EtablissementsService'];

  function EtablissementsListController(EtablissementsService) {
    var vm = this;

    vm.etablissements = EtablissementsService.query();
  }
}());
