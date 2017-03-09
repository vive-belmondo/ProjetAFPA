'use strict';

/**
 * Module dependencies
 */
 var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Cars Permissions
 */
 exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/curriculums',
      permissions: '*'
    }, {
      resources: '/api/curriculums/:curriculumId',
      permissions: '*'
    }, {
      resources: '/api/uploadCarPicture',
      permissions: '*'
    }, {
      resources: '/api/getDate',
      permissions: '*'
    }, {
      resources: '/api/curriculums/pdf/:userId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/curriculums',
      permissions: ['get']
    }, {
      resources: '/api/curriculums/:curriculumId',
      permissions: ['get']
    }, {
      resources: '/api/getDate',
      permissions: ['get']
    }, {
      resources: '/api/curriculums/pdf/:userId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/curriculums',
      permissions: ['get']
    }, {
      resources: '/api/getDate',
      permissions: ['get']
    }, {
      resources: '/api/curriculums/:curriculumId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Cars Policy Allows
 */
 exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

    // If an curriculum is being processed and the current user created it then allow any manipulation
    if (req.curriculum && req.user && req.curriculum.user && req.curriculum.user.id === req.user.id) {
      return next();
    }

    // Check for user roles
    acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
      if (err) {
            // An authorization error occurred
            return res.status(500).send('Unexpected authorization error');
          } else {
            if (isAllowed) {
                // Access granted! Invoke next middleware
                return next();
              } else {
                return res.status(403).json({
                  message: 'User is not authorized'
                });
              }
            }
          });
  };