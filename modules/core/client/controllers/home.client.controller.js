(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

    // HomeController.$inject = ['$http'];

  function HomeController() {
    var vm = this;
   	

    // function getVicopo(val){
    //   var data = {
    //     val : val
    //   };
    //   $http.post('api/getVicopo', data).success(function(res){
    //     vm.copo = res;
    //   });
    // }
   
      
    // $http.get('https://vicopo.selfbuild.fr/api.min.js').then(function successCallback(response){
    //   console.log(response); // voir dans le console.log et cliquer sur Object pour voir ce qu'il y a dedans
      
    // });
	
  }
}());
