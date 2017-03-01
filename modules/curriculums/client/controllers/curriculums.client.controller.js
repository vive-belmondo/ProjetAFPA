(function () {
  'use strict';

  angular
    .module('curriculums')
    .controller('CurriculumsController', CurriculumsController);

  CurriculumsController.$inject = ['$scope', 'Authentication'];

  function CurriculumsController($scope, Authentication) {
    var vm = this;

    vm.user = Authentication.user;
  }
}());
