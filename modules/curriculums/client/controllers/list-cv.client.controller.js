(function () {
  'use strict';

  angular
    .module('curriculums')
    .controller('ListCvController', ListCvController);

  ListCvController.$inject = ['$scope', 'Authentication', '$http', '$window', 'AdminService', 'UsersService', 'ExperiencesService' , 'FormationsService' , 'EtablissementsService', 'CompetencesService', 'TechniquesService', 'LanguesService'];

  function ListCvController($scope, Authentication, $http, $window, AdminService, UsersService,ExperiencesService, FormationsService, EtablissementsService, CompetencesService,TechniquesService,LanguesService) {
    var vm = this;
    vm.users = UsersService.query();
    vm.downloadPdf = downloadPdf;
    vm.etablissement = EtablissementsService.query();
    // vm.fonctions = FonctionsService.query();
    vm.competences = CompetencesService.query();
    vm.techniques = TechniquesService.query();
    vm.langues = LanguesService.query();
    vm.experiences = ExperiencesService.query();
    vm.formations = FormationsService.query();
   



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
