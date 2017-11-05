'use strict';

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
module.exports.validate = (request, username, password, callback) => {

    const user = users[username];
    if (!user) {
        return callback(null, false);
    }

    Bcrypt.compare(password, user.password, (err, isValid) => {

        callback(err, isValid, { id: user.id, name: user.name });
    });
};

// Generate a hash password, given a plain text password
module.exports.hashpwd = (username, plainTextPwd) => {

    const saltRounds = 10;
    Bcrypt.hash(plainTextPwd, saltRounds, (err, hash) => {
        // Store hash in your password DB.
        const user = users[username];
        user.password = hash;
    });
};

// -----------------------------------------------
// Use this as the validate function for Basic Auth in the
// auth.js plugin
// -----------------------------------------------
function basicAuthValidate (request, username, password, callback) {
    // KD: Looks like username, password is passed in and
    // we don't need to get it explicitly from the request
    // Get username and password from the incoming request
    const XXusername = request.payload.username;
    const XXpassword = request.payload.password;

    // Find user in db for particular username
    UserModel.findOne({
        username
    }, (error, data) => {

        if (error) {
            reply(Boom.serverUnavailable('Internal Mongo error'), error);
        }
        else if (data === null) {
            // No matching user
            reply(Boom.unauthorized('Username or Password invalid'));
        }
        else {
            // Check if user input password matches hashed password saved in db
            const dbpassword = data.password;
            if (!Crypto.check(password, dbpassword)) {
                reply(Boom.unauthorized('Username or Password invalid'));
            }
        }
    }); 
}


