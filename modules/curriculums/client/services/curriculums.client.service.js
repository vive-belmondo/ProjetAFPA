(function () {
  'use strict';

  // Users service used for communicating with the curriculum REST endpoint
  angular
    .module('curriculums.admin.services')
    .factory('CurriculumsService', CurriculumsService);

  CurriculumsService.$inject = ['$resource'];

  function CurriculumsService($resource) {
    var Curriculum = $resource('/api/curriculums/:curriculumId', 
      {
        curriculumId: '@_id'
      }, {
      update: {
        method: 'PUT'
      }
    });

      angular.extend(Curriculum.prototype, {
      createOrUpdate: function () {
        var curriculum = this;
        return createOrUpdate(curriculum);
      }
    });

    return Curriculum;

    function createOrUpdate(curriculum) {
      if (curriculum._id) {
        return curriculum.$update(onSuccess, onError);
      } else {
        return curriculum.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(curriculum) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }








  }

  //TODO this should be Users service
  // angular
  //   .module('curriculums.admin.services')
  //   .factory('AdminService', AdminService);

  // AdminService.$inject = ['$resource'];

  // function AdminService($resource) {
  //   return $resource('/api/curriculums/:userId', {
  //     userId: '@_id'
  //   }, {
  //     update: {
  //       method: 'PUT'
  //     }
  //   });
  // }
}());
