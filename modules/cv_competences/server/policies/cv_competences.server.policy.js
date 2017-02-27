'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke cv_Competences Permissions
 */
exports.invokeRolesPolicies = function () {
    acl.allow([{
        roles: ['admin'],
        allows: [{
            resources: '/api/cv_competences',
            permissions: '*'
    }, {
            resources: '/api/cv_competences/:cv_competenceId',
            permissions: '*'
    }]
  }, {
        roles: ['user'],
        allows: [{
            resources: '/api/cv_competences',
            permissions: ['get']
    }, {
            resources: '/api/cv_competences/:cv_competenceId',
            permissions: ['get']
    }]
  }, {
        roles: ['guest'],
        allows: [{
            resources: '/api/cv_competences',
            permissions: ['get']
    }, {
            resources: '/api/cv_competences/:cv_competenceId',
            permissions: ['get']
    }]
  }]);
};

/**
 * Check If cv_Competences Policy Allows
 */
exports.isAllowed = function (req, res, next) {
    var roles = (req.user) ? req.user.roles : ['guest'];

    // If an cv_competence is being processed and the current user created it then allow any manipulation
    if (req.cv_competence && req.user && req.cv_competence.user && req.cv_competence.user.id === req.user.id) {
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