(function () {
  'use strict';

  angular
    .module('curriculums')
    .controller('LanguesController', LanguesController);

  LanguesController.$inject = ['$scope', '$state', '$window', 'langueResolve', 'Authentication', 'Notification'];

  function LanguesController($scope, $state, $window, langue, Authentication, Notification) {
    var vm = this;

    vm.langue = langue;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.back = back;
    // vm.AjoutOptionAuSelect = AjoutOptionAuSelect;

    // Remove existing Langue
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.langue.$remove(function() {
          $state.go('admin.langues.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Langue deleted successfully!' });
        });
      }
    }


    // Save Langue
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.langueForm');
        return false;
      }

      // Create a new langue, or update the current instance
      vm.langue.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('curriculums.langues.list'); // should we send the User to the list or the updated Langue's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Langue saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Langue save error!' });
      }
    }
    
    function back() {
      $state.go('curriculums.langues.list'); // should we send the User to the list or the updated Langue's view?
    }

  }
}());
