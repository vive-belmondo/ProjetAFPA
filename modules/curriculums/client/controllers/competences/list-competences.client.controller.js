(function () {
  'use strict';

  angular
    .module('curriculums')
    .controller('CompetencesListController', CompetencesListController);

  CompetencesListController.$inject = ['CompetencesService'];

  function CompetencesListController(CompetencesService) {
    var vm = this;

    vm.competences = CompetencesService.query();
  }
}());
