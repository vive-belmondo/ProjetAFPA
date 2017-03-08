// (function () {
//   'use strict';

//   // Users service used for communicating with the curriculum REST endpoint
//   angular
//     .module('curriculums.admin.services')
//     .factory('CurriculumsService', CurriculumsService);

//   CurriculumsService.$inject = ['$resource'];

//   function CurriculumsService($resource) {
//     var Users = $resource('/api/curriculum', {}, {
//       update: {
//         method: 'PUT'
//       }
//     });
//   }

//   // TODO this should be Users service
//   angular
//     .module('curriculums.admin.services')
//     .factory('AdminService', AdminService);

//   AdminService.$inject = ['$resource'];

//   function AdminService($resource) {
//     return $resource('/api/curriculum/:userId', {
//       userId: '@_id'
//     }, {
//       update: {
//         method: 'PUT'
//       }
//     });
//   }
// }());
