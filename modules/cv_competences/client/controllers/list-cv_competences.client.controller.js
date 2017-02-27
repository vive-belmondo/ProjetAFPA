(function () {
  'use strict';

  angular
    .module('cv_competences')
    .controller('cv_CompetencesListController', cv_CompetencesListController);

  cv_CompetencesListController.$inject = ['cv_CompetencesService'];

  function cv_CompetencesListController(cv_CompetencesService) {
    var vm = this;

    vm.cv_competences = cv_CompetencesService.query();
  }
}());
