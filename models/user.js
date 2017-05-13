var mongoose = require('mongoose');

// Define the fields, default values and validation for the User mongodb schema 
// Create and export the model
var Schema = mongoose.Schema; 
var UserSchema = new Schema({
    username: {type: String, required: true, unique: true },
    password: {type: String, required: true},
    name: String,
    scope: {type: String, enum: ['Admin', 'Customer', 'Guest'], default: 'Customer'},
    isVerified: {type: Boolean, default: false} 
}); 

module.exports = mongoose.model('User', UserSchema, 'User');