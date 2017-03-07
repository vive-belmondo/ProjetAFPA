(function () {
  'use strict';

  // Focus the element on page load
  // Unless the user is on a small device, because this could obscure the page with a keyboard

  angular.module('curriculums')
    .directive('myFm', myFm);


  function myFm() {
    var directive = {
      restrict: 'EA',
      templateUrl: '/modules/curriculums/client/directives/templates/my-Fm.client.directive.template.html',
      // scope:{data:'=myXpData'},
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
    }
  }
}());
