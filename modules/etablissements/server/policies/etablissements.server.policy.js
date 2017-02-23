'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Etablissements Permissions
 */
exports.invokeRolesPolicies = function () {
    acl.allow([{
        roles: ['admin'],
        allows: [{
            resources: '/api/etablissements',
            permissions: '*'
    }, {
            resources: '/api/etablissements/:etablissementId',
            permissions: '*'
    }]
  }, {
        roles: ['user'],
        allows: [{
            resources: '/api/etablissements',
            permissions: ['get', 'post']
    }, {
            resources: '/api/etablissements/:etablissementId',
            permissions: ['get', 'post']
    }]
  }, {
        roles: ['guest'],
        allows: [{
            resources: '/api/etablissements',
            permissions: ['get']
    }, {
            resources: '/api/etablissements/:etablissementId',
            permissions: ['get']
    }]
  }]);
};

/**
 * Check If Etablissements Policy Allows
 */
exports.isAllowed = function (req, res, next) {
    var roles = (req.user) ? req.user.roles : ['guest'];

    // If an etablissement is being processed and the current user created it then allow any manipulation
    if (req.etablissement && req.user && req.etablissement.user && req.etablissement.user.id === req.user.id) {
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