(function () {
  'use strict';

  angular
    .module('curriculums')
    .controller('ListCvController', ListCvController);

  ListCvController.$inject = ['$scope','Notification', 'Authentication', '$http', '$window', 'AdminService', 'UsersService', 'FonctionsService', 'EtablissementsService', 'ExperiencesByConnectedUserService', 'FormationsByConnectedUserService', 'CompetencesByConnectedUserService', 'TechniquesByConnectedUserService', 'LanguesByConnectedUserService', 'CurriculumsService'];

  function ListCvController($scope,Notification,Authentication, $http, $window, AdminService, UsersService, FonctionsService, EtablissementsService, ExperiencesByConnectedUserService, FormationsByConnectedUserService, CompetencesByConnectedUserService,TechniquesByConnectedUserService,LanguesByConnectedUserService, CurriculumsService) {
    var vm = this;
    
    vm.downloadPdf = downloadPdf;

    // vm.cvs = CurriculumsService.query();
    vm.users = UsersService.query();


    console.log(vm.cvs);

    console.log(vm.users);


    function downloadPdf(user) {
      $http.get('/api/curriculums/pdf/' + user._id)
       .then(function(response) {
          var path = response.data;
              path = path.slice(1);
          $window.open (path, '_blank');
      });
    }
  }
}());
