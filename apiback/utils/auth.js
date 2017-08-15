'use strict';

// ============================== Start Basic Auth ======================
// Bcrypt library to hash passwords
const Bcrypt = require('bcryptjs');

// Our in-memory user db for testing Basic Auth
const users = {
    ketan: {
        username: 'ketan',
        password: '',
        name: 'Ketan Doshi',
        id: '2133d32a'
    }
};

// User-defined validation function that is required by the Basic Auth plugin
// Given an incoming username and password, compare it with the hashed password
// saved in the user db and check if they match
const basicValidate = function (request, username, password, callback) {

    const user = users[username];
    if (!user) {
        return callback(null, false);
    }

    Bcrypt.compare(password, user.password, (err, isValid) => {

        callback(err, isValid, { id: user.id, name: user.name });
    });
};

// Generate a hash password, given a plain text password
const hashpwd = (username, plainTextPwd) => {

    const saltRounds = 10;
    Bcrypt.hash(plainTextPwd, saltRounds, (err, hash) => {
        // Store hash in your password DB.
        const user = users[username];
        user.password = hash;
    });
};
// ============================== End Basic Auth ======================

// ============================== Start JWT ======================

// User-defined validation function that is required by the JWT plugin
// Given a decoded JWT that has been verified by the plugin, check if the
// userID in the JWT exists in the user db
const jwtValidate = function (decoded, request, callback) {

    const UserModel = require('../models/user');
    UserModel.findOne({
        _id: decoded.id
    }, (error, data) => {

        if (error || data.length === 0) {
            // User not found
            return callback(null, false);
        }
        else {
            // Validated
            return callback(null, true);
        }
    });
};

// ============================== End JWT ======================


// -----------------------------------------------
// Initialises all authentication approaches we want to use. For each
// authentication scheme:
//      Load the corresponding authentication plugin, create a strategy for it and
//      set optional parameters
// -----------------------------------------------
exports.register = function (server, options, next) {

    const registerRoutes = options.registerRoutes;

    hashpwd('ketan', 'hipwd');

    server.log('info', 'registering simple auth');
    server.register([
        {
            // Load Basic Auth plugin
            register: require('hapi-auth-basic')
        },
        {
            // Load Cookie Auth plugin
            register: require('hapi-auth-cookie')
        },
        {
            // Load JWT Auth plugin
            register: require('hapi-auth-jwt2')
        },
        {
            // Load Bell OAuth plugin
            register: require('bell')
        }
    ], (err) => {
        // Create strategy for Basic Auth
        server.auth.strategy('basic', 'basic',
            {
                // Basic Auth requires us to provide a user-defined
                //  validation function
                validateFunc: basicValidate
            }
        );

        // Create strategy for Cookie Auth
        server.auth.strategy('cookie', 'cookie',
            {
                password: 'password-should-be-32-characters-or-more',
                cookie: 'kdh',  // name of the cookie to set
                isSecure: false // needed to send cookie even if no https
            }
        );

        // Create strategy for JWT Auth
        server.auth.strategy('jwt', 'jwt',
            {
                key: 'NeverShareYourSecret',
                validateFunc: jwtValidate,
                verifyOptions: {
                    algorithms: ['HS256']
                }
            }
        );

        // Create strategy for Bell OAuth
        var bellAuthOptions = {
                provider: 'github',
                password: 'secret_cookie_github-encryption-password', //Password used for encryption
                clientId: 'c781f65a06019360a0f4',       //My Github App ClientId,
                clientSecret: 'ad9567c9384c518e86788b67abc256ad6fffe933',   //My Github App ClientSecret,
                isSecure: false
        };
        server.auth.strategy('github', 'bell', bellAuthOptions);

        registerRoutes();
    });

    // Next must be called at the end of register
    return next();
};

// Plugin registration attributes
exports.register.attributes = {
    name: 'auth'
};
