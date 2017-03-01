(function () {
  'use strict';

  angular
    .module('curriculums.admin')
    .controller('CvsController', CvsController);

  CvsController.$inject = ['$scope', '$state', '$window','FonctionsService','EtablissementsService', 'Authentication', 'userResolve', 'Notification'];

  function CvsController($scope, $state, $window,FonctionsService,EtablissementsService, Authentication, user, Notification) {
    var vm = this;

    vm.authentication = Authentication;
    vm.user = user;
    vm.remove = remove;
    vm.update = update;
    vm.isContextUserSelf = isContextUserSelf;
    vm.fonctions = FonctionsService.query();
    vm.etablissements = EtablissementsService.query();



  }
}());
