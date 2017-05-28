'use strict';

// HAPI plugin to establish connection with Mongo DB using mongoose

exports.register = function (server, options, next) {
    // Include Mongoose ORM to connect with database
    const Mongoose = require('mongoose');

    // URL for `library` database in the hosted mlab mongodb
    const mongoDB = 'mongodb://kdmongo:kdmongo@ds133418.mlab.com:33418/library';

    // Connect with mongoose database
    Mongoose.connect(mongoDB);
    // Once connected, get the default db connection
    const db = Mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    // Next must be called at the end of register
    return next();
};

// Plugin registration attributes
exports.register.attributes = {
    name: 'mongo'
};
