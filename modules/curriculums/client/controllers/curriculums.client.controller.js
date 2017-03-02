(function () {
  'use strict';

  angular
    .module('curriculums')
    .controller('CurriculumsController', CurriculumsController);

  CurriculumsController.$inject = ['$scope', 'Authentication', 'competenceResolve'];

  function CurriculumsController($scope, Authentication) {
    var vm = this;

    vm.user = Authentication.user;

  }


	function downloadPdf(car) {
	$http.get('/api/cars/pdf/' + car._id)
	 .then(function(response) {
	    var path = response.data;
	        path = path.slice(1);
	    $window.open (path, '_blank');
	});
}




}());
