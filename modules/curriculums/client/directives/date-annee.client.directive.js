(function () {
  'use strict';

  // Focus the element on page load
  // Unless the user is on a small device, because this could obscure the page with a keyboard

  angular.module('curriculums')
    .directive('dateAnnee', dateAnnee);


  function dateAnnee() {
    var directive = {
      restrict: 'EA',
      templateUrl: '/modules/curriculums/client/directives/templates/annee.client.directive.template.html',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
    }
  }
}());
