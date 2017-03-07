(function () {
  'use strict';

  angular
    .module('curriculums')
    .controller('FormationsListController', FormationsListController);

  FormationsListController.$inject = ['$location', '$window', 'Notification','$scope', '$state', 'formationResolve', 'Authentication', 'FormationsByConnectedUserService', 'UsersService'];

  function FormationsListController($location, $window, Notification, $scope, $state, formation, Authentication, FormationsByConnectedUserService, UsersService) {
    var vm = this;
    vm.remove = remove;
    vm.formation = formation;
    vm.authentication = Authentication;
    vm.form = {};
    vm.save = save;
    vm.back = back;

    vm.formations = FormationsByConnectedUserService.query();

    function remove(formation) {
      if ($window.confirm('Etes-vous sûr(e) de vouloir supprimer?')) {
        formation.$remove(function() {
	        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> La compétence pédagogique est supprimée avec succès' });
	        vm.formations.splice(vm.formations.indexOf(formation),1);
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
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> La compétence pédagogique est sauvegardée avec succès' });
        vm.formations.push(res);
        $state.reload();
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Erreur de sauvegarde!' });
      }
    }


    function back() {
      $state.go('curriculums.formations.list'); // should we send the User to the list or the updated Formation's view?
    }



    var today = new Date();
    var anneeEnCours = today.getUTCFullYear();
      vm.years = [];
      for (var i=anneeEnCours; i > anneeEnCours-60; i--)
      {
       
        vm.years.push(i);
      }
  }
}());


