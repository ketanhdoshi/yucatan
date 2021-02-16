'use strict';

// HAPI plugin to establish connection with Mongo DB using mongoose

module.exports = {
    name: "mongo",
    version: "1.0.0",
    register: async (server, options) => {
        // Include Mongoose ORM to connect with database
        const Mongoose = require('mongoose');

        // URL for `library` database in the hosted mlab mongodb
        // const mongoDB = 'mongodb://kdmongo:kdmongo@ds133418.mlab.com:33418/library';
        // const mongoDB = 'mongodb+srv://kdmongo:kdmongo@kdcluster0.atzzm.mongodb.net/kdlib?retryWrites=true&w=majority';
        const mongoDB = 'mongodb+srv://kdmongo:kdmongo@kdcluster0.atzzm.mongodb.net/library?retryWrites=true&w=majority';

        // Connect with mongoose database
        await Mongoose.connect(mongoDB);
        // Once connected, get the default db connection
        const db = Mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => {
            console.log('Connected to Mongo');
        });
    }
}
