﻿(function () {
  'use strict';

  angular
    .module('competences.admin')
    .controller('CompetencesAdminListController', CompetencesAdminListController);

  CompetencesAdminListController.$inject = ['CompetencesService', '$window', 'Notification','$scope', '$state', 'competenceResolve', 'Authentication'];

  function CompetencesAdminListController(CompetencesService, $window, Notification, $scope, $state, competence, Authentication) {
    var vm = this;
    vm.remove = remove;
    vm.competence = competence;
    vm.authentication = Authentication;
    vm.form = {};
    vm.save = save;
    vm.back = back;




	vm.competences = CompetencesService.query();

    // Remove existing Competence
    function remove(competence) {
      if ($window.confirm('Are you sure you want to delete?')) {
        competence.$remove(function() {
	        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Competence deleted successfully!' });
	        vm.competences.splice(vm.competences.indexOf(competence),1);

        });
      }
    }

    // Save Competence
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.competenceForm');
        return false;
      }

      // Create a new competence, or update the current instance
      vm.competence.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.competences.list'); // should we send the User to the list or the updated Competence's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Competence saved successfully!' });
        vm.competences.push(res);
        $state.reload();
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Competence save error!' });
      }
    }

    function back() {
      $state.go('admin.competences.list'); // should we send the User to the list or the updated Competence's view?
    }
  }
}());