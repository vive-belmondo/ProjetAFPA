(function () {
  'use strict';

  angular
    .module('curriculums.admin')
    .controller('CurriculumsListController', CurriculumsListController);

  CurriculumsListController.$inject = ['$scope', '$filter', 'AdminService','FonctionsService','EtablissementsService',];

  function CurriculumsListController($scope, $filter, AdminService,FonctionsService,EtablissementsService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.fonctions = FonctionsService.query();
    vm.etablissements = EtablissementsService.query();
    
    AdminService.query(function (data) {
      vm.curriculums = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.curriculums, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end); 
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
}());
