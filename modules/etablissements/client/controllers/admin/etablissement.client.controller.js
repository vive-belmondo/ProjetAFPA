(function () {
  'use strict';

  angular
    .module('etablissements.admin')
    .controller('EtablissementsAdminController', EtablissementsAdminController);

  EtablissementsAdminController.$inject = ['$scope', '$state', '$window', 'etablissementResolve', 'Authentication', 'Notification'];

  function EtablissementsAdminController($scope, $state, $window, etablissement, Authentication, Notification) {
    var vm = this;

    vm.etablissement = etablissement;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.back = back;

    // vm.AjoutOptionAuSelect = AjoutOptionAuSelect;

    // Remove existing Etablissement
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.etablissement.$remove(function() {
          $state.go('admin.etablissements.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Etablissement deleted successfully!' });
        });
      }
    }


    // Save Etablissement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.etablissementForm');
        return false;
      }

      // Create a new etablissement, or update the current instance
      vm.etablissement.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.etablissements.list'); // should we send the User to the list or the updated Etablissement's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Etablissement saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Etablissement save error!' });
      }
    }

    function back() {
        $state.go('admin.etablissements.list'); // should we send the User to the list or the updated Fonction's view?
    }

  }
}());
