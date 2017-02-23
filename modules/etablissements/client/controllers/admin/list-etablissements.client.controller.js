(function () {
  'use strict';

  angular
    .module('etablissements.admin')
    .controller('EtablissementsAdminListController', EtablissementsAdminListController);

  EtablissementsAdminListController.$inject = ['EtablissementsService', '$window', 'Notification'];

  function EtablissementsAdminListController(EtablissementsService, $window, Notification) {
    var vm = this;
    vm.remove = remove;


	vm.etablissements = EtablissementsService.query();

    // Remove existing Etablissement
    function remove(etablissement) {
      if ($window.confirm('Are you sure you want to delete?')) {
        etablissement.$remove(function() {
	        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Etablissement deleted successfully!' });
	        vm.etablissements.splice(vm.etablissements.indexOf(etablissement),1);

        });
      }
    }
  }
}());
