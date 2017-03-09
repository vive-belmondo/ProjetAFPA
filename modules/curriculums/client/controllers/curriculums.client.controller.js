(function () {
  'use strict';

  angular
    .module('curriculums')
    .controller('CurriculumsController', CurriculumsController);

  CurriculumsController.$inject = ['$scope', 'Authentication', '$http', '$window', 'AdminService', 'UsersService','ExperiencesByConnectedUserService', 'FormationsByConnectedUserService', 'FonctionsService', 'EtablissementsService', 'CompetencesByConnectedUserService', 'TechniquesByConnectedUserService', 'LanguesByConnectedUserService'];

  function CurriculumsController($scope, Authentication, $http, $window, AdminService, UsersService, FonctionsService, EtablissementsService,ExperiencesByConnectedUserService, FormationsByConnectedUserService, CompetencesByConnectedUserService,TechniquesByConnectedUserService,LanguesByConnectedUserService) {
    var vm = this;
    vm.user = Authentication.user;
    vm.downloadPdf = downloadPdf;
    vm.etablissement = EtablissementsService.query();
    vm.fonctions = FonctionsService.query();
    vm.competences = CompetencesByConnectedUserService.query();
    vm.techniques = TechniquesByConnectedUserService.query();
    vm.langues = LanguesByConnectedUserService.query();
    vm.experiences = ExperiencesByConnectedUserService.query();
    vm.formations = FormationsByConnectedUserService.query();



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
