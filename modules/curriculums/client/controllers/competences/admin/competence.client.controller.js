(function () {
  'use strict';

  angular
    .module('curriculums.admin')
    .controller('CompetencesAdminController', CompetencesAdminController);

  CompetencesAdminController.$inject = ['$scope', '$state', '$window', 'competenceResolve', 'Authentication', 'Notification'];

  function CompetencesAdminController($scope, $state, $window, competence, Authentication, Notification) {
    var vm = this;

    vm.competence = competence;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    // vm.AjoutOptionAuSelect = AjoutOptionAuSelect;

    // Remove existing Competence
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.competence.$remove(function() {
          $state.go('admin.competences.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Competence deleted successfully!' });
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
