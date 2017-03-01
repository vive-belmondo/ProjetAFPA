(function () {
  'use strict';

  angular
    .module('curriculums')
    .controller('TechniquesListController', TechniquesListController);

  TechniquesListController.$inject = ['TechniquesService', '$window', 'Notification','$scope', '$state', 'techniqueResolve', 'Authentication'];

  function TechniquesListController(TechniquesService, $window, Notification, $scope, $state, technique, Authentication) {
    var vm = this;
    vm.remove = remove;
    vm.technique = technique;
    vm.authentication = Authentication;
    vm.form = {};
    vm.save = save;
    vm.back = back;




	 vm.techniques = TechniquesService.query();

    // Remove existing Technique
    function remove(technique) {
      if ($window.confirm('Are you sure you want to delete?')) {
        technique.$remove(function() {
	        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Technique deleted successfully!' });
	        vm.techniques.splice(vm.techniques.indexOf(technique),1);

        });
      }
    }

    // Save Technique
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.techniqueForm');
        return false;
      }

      // Create a new technique, or update the current instance
      vm.technique.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('curriculums.techniques.list'); // should we send the User to the list or the updated Technique's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Technique saved successfully!' });
        vm.techniques.push(res);
        $state.reload();
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Technique save error!' });
      }
    }

    function back() {
      $state.go('curriculums.techniques.list'); // should we send the User to the list or the updated Technique's view?
    }
  }
}());
