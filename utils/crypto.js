'use strict';

// Bcrypt library to hash passwords
const Bcrypt = require('bcryptjs');

// Generate a hash password, given a plain text password
module.exports.hash = (plainText) => {

    const saltRounds = 10;
    const hash = Bcrypt.hashSync(plainText, saltRounds);
    return (hash);
};

// Given a plaintext password and a hashed password, compare and
// check if they match
module.exports.check = (plainText, hash) => {

    const isMatch = Bcrypt.compareSync(plainText, hash);
    return (isMatch);
};
