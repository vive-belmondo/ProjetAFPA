(function () {
  'use strict';

  angular
    .module('cv_competences.admin')
    .controller('cv_CompetencesAdminListController', cv_CompetencesAdminListController);

  cv_CompetencesAdminListController.$inject = ['cv_CompetencesService', '$window', 'Notification','$scope', '$state', 'cv_competenceResolve', 'Authentication'];

  function cv_CompetencesAdminListController(cv_CompetencesService, $window, Notification, $scope, $state, cv_competence, Authentication) {
    var vm = this;
    vm.remove = remove;
    vm.cv_competence = cv_competence;
    vm.authentication = Authentication;
    vm.form = {};
    vm.save = save;
    vm.back = back;




	vm.cv_competences = cv_CompetencesService.query();

    // Remove existing cv_Competence
    function remove(cv_competence) {
      if ($window.confirm('Are you sure you want to delete?')) {
        cv_competence.$remove(function() {
	        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> cv_Competence deleted successfully!' });
	        vm.cv_competences.splice(vm.cv_competences.indexOf(cv_competence),1);

        });
      }
    }

    // Save cv_Competence
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.cv_competenceForm');
        return false;
      }

      // Create a new cv_competence, or update the current instance
      vm.cv_competence.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.cv_competences.list'); // should we send the User to the list or the updated cv_Competence's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> cv_Competence saved successfully!' });
        vm.cv_competences.push(res);
        $state.reload();
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> cv_Competence save error!' });
      }
    }

    function back() {
      $state.go('admin.cv_competences.list'); // should we send the User to the list or the updated cv_Competence's view?
    }
  }
}());
