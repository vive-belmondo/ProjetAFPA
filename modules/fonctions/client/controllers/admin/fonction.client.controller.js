(function () {
  'use strict';

  angular
    .module('fonctions.admin')
    .controller('FonctionsAdminController', FonctionsAdminController);

  FonctionsAdminController.$inject = ['$scope', '$state', '$window', 'fonctionResolve', 'Authentication', 'Notification'];

  function FonctionsAdminController($scope, $state, $window, fonction, Authentication, Notification) {
    var vm = this;

    vm.fonction = fonction;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.back = back;

    // vm.AjoutOptionAuSelect = AjoutOptionAuSelect;

    // Remove existing fonction
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.fonction.$remove(function() {
          $state.go('admin.fonctions.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> fonction deleted successfully!' });
        });
      }
    }


    // Save fonction
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.fonctionForm');
        return false;
      }

      // Create a new fonction, or update the current instance
      vm.fonction.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.fonctions.list'); // should we send the User to the list or the updated fonction's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> fonction saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> fonction save error!' });
      }
    }

    function back() {
        $state.go('admin.fonctions.list'); // should we send the User to the list or the updated Fonction's view?
    }

  }
}());
