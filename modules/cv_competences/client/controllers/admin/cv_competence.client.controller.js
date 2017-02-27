(function () {
  'use strict';

  angular
    .module('cv_competences.admin')
    .controller('cv_CompetencesAdminController', cv_CompetencesAdminController);

  cv_CompetencesAdminController.$inject = ['$scope', '$state', '$window', 'cv_competenceResolve', 'Authentication', 'Notification'];

  function cv_CompetencesAdminController($scope, $state, $window, cv_competence, Authentication, Notification) {
    var vm = this;

    vm.cv_competence = cv_competence;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    // vm.AjoutOptionAuSelect = AjoutOptionAuSelect;

    // Remove existing cv_Competence
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.cv_competence.$remove(function() {
          $state.go('admin.cv_competences.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> cv_Competence deleted successfully!' });
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
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> cv_Competence save error!' });
      }
    }
  }
}());
