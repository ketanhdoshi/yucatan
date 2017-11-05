'use strict';
const Mongoose = require('mongoose');

// Define the fields, default values and validation for the User mongodb schema
// Create and export the model
const Schema = Mongoose.Schema;
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    scope: { type: String, enum: ['Admin', 'Customer', 'Guest'], default: 'Customer' },
    isVerified: { type: Boolean, default: false },
    oAuthUserId: { type: String, required: false, unique: true }
});

module.exports = Mongoose.model('User', UserSchema, 'User');
