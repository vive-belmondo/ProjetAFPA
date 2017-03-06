(function () {
  'use strict';

  angular
    .module('curriculums')
    .controller('ExperiencesListController', ExperiencesListController);

  ExperiencesListController.$inject = ['$location', '$window', 'Notification','$scope', '$state', 'experienceResolve', 'Authentication', 'ExperiencesByConnectedUserService', 'UsersService'];

  function ExperiencesListController($location, $window, Notification, $scope, $state, experience, Authentication, ExperiencesByConnectedUserService, UsersService) {
    var vm = this;
    vm.remove = remove;
    vm.experience = experience;
    vm.authentication = Authentication;
    vm.form = {};
    vm.save = save;
    vm.back = back;

    vm.experiences = ExperiencesByConnectedUserService.query();

    function remove(experience) {
      if ($window.confirm('Etes-vous sûr(e) de vouloir supprimer?')) {
        experience.$remove(function() {
	        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> La compétence pédagogique est supprimée avec succès' });
	        vm.experiences.splice(vm.experiences.indexOf(experience),1);
        });
      }
    }


    // Save Experience
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.experienceForm');
        return false;
      }

      // Create a new experience, or update the current instance
      vm.experience.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('curriculums.experiences.list'); // should we send the User to the list or the updated Experience's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> La compétence pédagogique est sauvegardée avec succès' });
        vm.experiences.push(res);
        $state.reload();
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Erreur de sauvegarde!' });
      }
    }


    function back() {
      $state.go('curriculums.experiences.list'); // should we send the User to the list or the updated Experience's view?
    }


  }
}());


