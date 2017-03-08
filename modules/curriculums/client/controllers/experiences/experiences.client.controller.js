(function () {
  'use strict';

  angular
    .module('curriculums')
    .controller('ExperiencesController', ExperiencesController);

  ExperiencesController.$inject = ['$scope', '$state', '$window', 'experienceResolve', 'Authentication', 'Notification'];

  function ExperiencesController($scope, $state, $window, experience, Authentication, Notification) {
    var vm = this;

    vm.experience = experience;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.back = back;
    // vm.AjoutOptionAuSelect = AjoutOptionAuSelect;

    // Remove existing Experience
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.experience.$remove(function() {
          $state.go('admin.experiences.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Experience deleted successfully!' });
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
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Experience saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Experience save error!' });
      }
    }
    
    function back() {
      $state.go('curriculums.experiences.list'); // should we send the User to the list or the updated Experience's view?
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
