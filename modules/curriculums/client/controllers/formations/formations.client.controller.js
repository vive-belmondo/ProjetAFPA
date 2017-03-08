(function () {
  'use strict';

  angular
    .module('curriculums')
    .controller('FormationsController', FormationsController);

  FormationsController.$inject = ['$scope', '$state', '$window', 'formationResolve', 'Authentication', 'Notification'];

  function FormationsController($scope, $state, $window, formation, Authentication, Notification) {
    var vm = this;

    vm.formation = formation;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.back = back;
    // vm.AjoutOptionAuSelect = AjoutOptionAuSelect;

    // Remove existing Formation
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.formation.$remove(function() {
          $state.go('admin.formations.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Formation deleted successfully!' });
        });
      }
    }


    // Save Formation
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.formationForm');
        return false;
      }

      // Create a new formation, or update the current instance
      vm.formation.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('curriculums.formations.list'); // should we send the User to the list or the updated Formation's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Formation saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Formation save error!' });
      }
    }
    
    function back() {
      $state.go('curriculums.formations.list'); // should we send the User to the list or the updated Formation's view?
    }

        //////////table of years //////////////////////////////////
    var today = new Date();
    var anneeEnCours = today.getUTCFullYear();
      vm.years = [];
      for (var i=anneeEnCours; i > anneeEnCours-60; i--)
      {
       
        vm.years.push(i);/// [2017,2016,2015,2014,................,1958]//////
      }

  }
}());
