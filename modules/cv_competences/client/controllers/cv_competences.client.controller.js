(function () {
  'use strict';

  angular
    .module('cv_competences')
    .controller('cv_CompetencesController', cv_CompetencesController);

  cv_CompetencesController.$inject = ['$scope', 'cv_competenceResolve', 'Authentication'];

  function cv_CompetencesController($scope, cv_competence, Authentication) {
    var vm = this;

    vm.cv_competence = cv_competence;
    vm.authentication = Authentication;

  }
}());
