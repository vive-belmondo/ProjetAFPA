(function () {
  'use strict';

  angular
    .module('curriculums.services')
    .factory('ExperiencesByConnectedUserService', ExperiencesByConnectedUserService);

  ExperiencesByConnectedUserService.$inject = ['$resource', '$log'];

  function ExperiencesByConnectedUserService($resource, $log) {
    return $resource('/api/experiencesByConnectedUser/:experienceId', {
      experienceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
