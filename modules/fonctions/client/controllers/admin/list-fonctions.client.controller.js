(function () {
  'use strict';

  angular
    .module('fonctions.admin')
    .controller('FonctionsAdminListController', FonctionsAdminListController);

  FonctionsAdminListController.$inject = ['FonctionsService', '$window', 'Notification'];

  function FonctionsAdminListController(FonctionsService, $window, Notification) {
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
  }
}());
