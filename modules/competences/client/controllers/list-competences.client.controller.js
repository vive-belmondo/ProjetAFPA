(function () {
  'use strict';

  angular
    .module('competences')
    .controller('CompetencesListController', CompetencesListController);

  CompetencesListController.$inject = ['CompetencesService'];

  function CompetencesListController(CompetencesService) {
    var vm = this;

    vm.competences = CompetencesService.query();
  }
}());
