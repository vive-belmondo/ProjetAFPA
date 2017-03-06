(function () {
  'use strict';

  angular
    .module('curriculums')
    .controller('LanguesListController', LanguesListController);

  LanguesListController.$inject = ['$location', '$http', '$window', 'Notification','$scope', '$state', 'langueResolve', 'Authentication', 'LanguesByConnectedUserService', 'UsersService'];

  function LanguesListController($location, $http, $window, Notification, $scope, $state, langue, Authentication, LanguesByConnectedUserService, UsersService) {
    var vm = this;
    vm.remove = remove;
    vm.langue = langue;
    vm.authentication = Authentication;
    vm.form = {};
    vm.save = save;
    vm.back = back;

    vm.langues = LanguesByConnectedUserService.query();

    function remove(langue) {
      if ($window.confirm('Etes-vous sûr(e) de vouloir supprimer?')) {
        langue.$remove(function() {
	        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> La langue est supprimée avec succès' });
	        vm.langues.splice(vm.langues.indexOf(langue),1);
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
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> La langue est sauvegardée avec succès' });
        vm.langues.push(res);
        $state.reload();
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Erreur de sauvegarde!' });
      }
    }

////////// page précédente (annulation)
    function back() {
      $state.go('curriculums.langues.list'); // should we send the User to the list or the updated Langue's view?
    }


////////// récupération de la liste des langues du monde ///////

    // $http.get('https://restcountries.eu/rest/v2/lang/fr').then(function successCallback(response){
    //   console.log(response); // voir dans le console.log et cliquer sur Object pour voir ce qu'il y a dedans
    //   vm.langage = response.data;
    // });

  }
}());


