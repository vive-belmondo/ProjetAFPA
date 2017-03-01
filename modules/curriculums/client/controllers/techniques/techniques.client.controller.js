(function () {
  'use strict';

  angular
    .module('curriculums')
    .controller('TechniquesController', TechniquesController);

  TechniquesController.$inject = ['$scope', '$state', '$window', 'techniqueResolve', 'Authentication', 'Notification'];

  function TechniquesController($scope, $state, $window, technique, Authentication, Notification) {
    var vm = this;

    vm.technique = technique;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.back = back;
    // vm.AjoutOptionAuSelect = AjoutOptionAuSelect;

    // Remove existing Technique
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.technique.$remove(function() {
          $state.go('admin.techniques.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Technique deleted successfully!' });
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
