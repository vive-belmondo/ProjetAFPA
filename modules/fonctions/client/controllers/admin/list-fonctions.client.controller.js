(function () {
  'use strict';

  angular
    .module('fonctions.admin')
    .controller('FonctionsAdminListController', FonctionsAdminListController);

  FonctionsAdminListController.$inject = ['FonctionsService', '$window', 'Notification','$scope', '$state', 'fonctionResolve', 'Authentication'];

  function FonctionsAdminListController(FonctionsService, $window, Notification, $scope, $state, fonction, Authentication) {
    var vm = this;
    vm.remove = remove;


	vm.fonctions = FonctionsService.query();

    // Remove existing Fonction
    function remove(fonction) {
      if ($window.confirm('Are you sure you want to delete?')) {
        fonction.$remove(function() {
	        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Fonction deleted successfully!' });
	        vm.fonctions.splice(vm.fonctions.indexOf(fonction),1);

        });
      }
    }



    vm.fonction = fonction;
    vm.authentication = Authentication;
    vm.form = {};
    vm.save = save;

    // Save Fonction
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
        $state.go('admin.fonctions.list'); // should we send the User to the list or the updated Fonction's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Fonction saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Fonction save error!' });
      }
    }
  }
}());
