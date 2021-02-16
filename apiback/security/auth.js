'use strict';

// -----------------------------------------------
// Defines an 'auth' plugin


const Token = require('./token'); // for JWT tokens
const BasicCred = require('./basicCred'); // for basic user/pwd auth

// -----------------------------------------------
// Initialises all authentication approaches we want to use. For each
// authentication scheme:
//      Load the corresponding authentication plugin, create a strategy for it and
//      set optional parameters
// Note that we use only the JWT and Bell Oauth schemes. The Basic and Cookie
// schemes are kept here as examples only, along with the logic to make use
// of them in tryauth.js and basicCred.js
// -----------------------------------------------
module.exports = {
    name: "auth",
    version: "1.0.0",
    register: async (server, options) => {
    
        server.log('info', 'registering auth plugin');
        await server.register([
            {
                // Load Basic Auth plugin
                plugin: require('@hapi/basic')
            },
            {
                // Load Cookie Auth plugin
                plugin: require('@hapi/cookie')
            },
            {
                // Load JWT Auth plugin
                plugin: require('hapi-auth-jwt2')
            },
            {
                // Load Bell OAuth plugin
                plugin: require('@hapi/bell')
            }
        ]);

        // Create strategy for Basic Auth
        server.auth.strategy('basic', 'basic',
            {
                // Basic Auth requires us to provide a user-defined
                //  validation function
                validate: BasicCred.validate
            }
        );

        // Create strategy for Cookie Auth
        server.auth.strategy('cookie', 'cookie',
            {
                cookie: {
                    // Password used to encrypt the cookie
                    password: 'password-should-be-32-characters-or-more',
                    name: 'kdh',  // name of the cookie to set
                    isSecure: false // needed to send cookie even if no https
                }
            }
        );

        // Create strategy for JWT Auth
        server.auth.strategy('jwt', 'jwt',
            {
                key: 'NeverShareYourSecret',    // Secret key
                validate: Token.validateJwt,
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
    }
}

