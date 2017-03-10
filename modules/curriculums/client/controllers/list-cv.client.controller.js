(function () {
  'use strict';

  angular
    .module('curriculums')
    .controller('ListCvController', ListCvController);

  ListCvController.$inject = ['$scope','Notification','cvResolve', 'Authentication', '$http', '$window', 'AdminService', 'UsersService','ExperiencesByConnectedUserService', 'FormationsByConnectedUserService', 'FonctionsService', 'EtablissementsService', 'CompetencesByConnectedUserService', 'TechniquesByConnectedUserService', 'LanguesByConnectedUserService'];

  function ListCvController($scope,Notification,cv,Authentication, $http, $window, AdminService, UsersService, FonctionsService, EtablissementsService,ExperiencesByConnectedUserService, FormationsByConnectedUserService, CompetencesByConnectedUserService,TechniquesByConnectedUserService,LanguesByConnectedUserService) {
    var vm = this;
    
    vm.downloadPdf = downloadPdf;

    vm.cv = cv;
    vm.cv.users = UsersService.query();
    vm.cv.etablissement = EtablissementsService.query();
    vm.cv.fonctions = FonctionsService.query();
    vm.cv.competences = CompetencesByConnectedUserService.query();
    vm.cv.techniques = TechniquesByConnectedUserService.query();
    vm.cv.langues = LanguesByConnectedUserService.query();
    vm.cv.experiences = ExperiencesByConnectedUserService.query();
    vm.cv.formations = FormationsByConnectedUserService.query();
    vm.save = save;


    function save() {
      // Create a new formation, or update the current instance
      vm.cv.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
         // should we send the User to the list or the updated Formation's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> CV saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Formation save error!' });
      }
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
