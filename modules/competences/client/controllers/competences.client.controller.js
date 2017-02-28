(function () {
  'use strict';

  angular
    .module('competences')
    .controller('CompetencesController', CompetencesController);

  CompetencesController.$inject = ['$scope', 'competenceResolve', 'Authentication'];

  function CompetencesController($scope, competence, Authentication) {
    var vm = this;

    vm.competence = competence;
    vm.authentication = Authentication;

  }
}());
