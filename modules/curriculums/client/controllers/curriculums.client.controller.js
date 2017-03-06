(function () {
  'use strict';

  angular
    .module('curriculums')
    .controller('CurriculumsController', CurriculumsController);

  CurriculumsController.$inject = ['$scope', 'Authentication', '$http', '$window', 'UsersService', 'FonctionsService', 'EtablissementsService', 'CompetencesByConnectedUserService'];

  function CurriculumsController($scope, Authentication, $http, $window, UsersService, FonctionsService, EtablissementsService, CompetencesByConnectedUserService) {
    var vm = this;
    vm.user = Authentication.user;
    vm.downloadPdf = downloadPdf;
    vm.etablissement = EtablissementsService.query();
    vm.fonction = FonctionsService.query();
    vm.competences = CompetencesByConnectedUserService.query();


    function downloadPdf(user) {
    $http.get('/api/users/pdf/' + user._id)
     .then(function(response) {
        var path = response.data;
            path = path.slice(1);
        $window.open (path, '_blank');
      });
    }

  }
}());
