'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Competences Permissions
 */
exports.invokeRolesPolicies = function () {
    acl.allow([{
        roles: ['admin'],
        allows: [{
            resources: '/api/langues',
            permissions: '*'
    }, {
            resources: '/api/langues/:langueId',
            permissions: '*'
    }, {
            resources: '/api/languesByConnectedUser',
            permissions: '*'
    }, {
            resources: '/api/languesByConnectedUser/:langueId',
            permissions: '*'
    }]
  }, {
        roles: ['user'],
        allows: [{
            resources: '/api/langues',
            permissions: '*'
    }, {
            resources: '/api/langues/:langueId',
            permissions: '*'
    }, {
            resources: '/api/languesByConnectedUser',
            permissions: '*'
    }, {
            resources: '/api/languesByConnectedUser/:langueId',
            permissions: '*'
    }]
  }, {
        roles: ['guest'],
        allows: [{
            resources: '/api/langues',
            permissions: ['get']
    }, {
            resources: '/api/langues/:langueId',
            permissions: ['get']
    }]
  }]);
};

/**
 * Check If Competences Policy Allows
 */
exports.isAllowed = function (req, res, next) {
    var roles = (req.user) ? req.user.roles : ['guest'];

    // If an langue is being processed and the current user created it then allow any manipulation
    if (req.langue && req.user && req.langue.user && req.langue.user.id === req.user.id) {
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