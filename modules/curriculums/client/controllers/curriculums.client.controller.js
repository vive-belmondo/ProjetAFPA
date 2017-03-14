(function () {
  'use strict';

  angular
    .module('curriculums')
    .controller('CurriculumsController', CurriculumsController);

  CurriculumsController.$inject = ['$scope', 'Notification', 'CurriculumsService', 'Authentication', '$http', '$window', 'FonctionsService', 'EtablissementsService'];

  function CurriculumsController($scope, Notification, CurriculumsService, Authentication, $http, $window, FonctionsService, EtablissementsService) {
    var vm = this;
    
    vm.downloadPdf = downloadPdf;
    vm.user = Authentication.user;
    vm.fonctions = FonctionsService.query();
    vm.etablissements = EtablissementsService.query();


    vm.cv = CurriculumsService.get({
      curriculumId: Authentication.user.cv
    });

    vm.validateCV = validateCV;

    function validateCV() {
      $http.get('/api/validateCV').success(function() {
        console.log('ok');
      });
    }

    function downloadPdf(user) {
      $http.get('/api/curriculums/pdf/' + cv._id)
         .then(function(response) {
            var path = response.data;
                path = path.slice(1);
            $window.open (path, '_blank');
        });
      }
    }
}());
