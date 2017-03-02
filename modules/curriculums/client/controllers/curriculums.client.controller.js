(function () {
  'use strict';

  angular
    .module('curriculums')
    .controller('CurriculumsController', CurriculumsController);

  CurriculumsController.$inject = ['$scope', 'Authentication', 'competenceResolve', '$http', '$window', 'CompetencesByUserService'];

  function CurriculumsController($scope, Authentication, $http, $window, CompetencesByUserService) {
    var vm = this;
    vm.user = Authentication.user;
    vm.downloadPdf = downloadPdf;


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
