var mongoose = require('mongoose');
require('mongoose-type-url');

// Define the fields, default values and validation for the Property mongodb schema 
// Create and export the model
var Schema = mongoose.Schema; 
var PropertySchema = new Schema({
    address: {
        line1: String,
        line2: String,
        locality: String,
        region: String,
        country: { type: String, required: true },
        postalCode: String
    },
    // TODO: Should save houseType/roomType as numeric ids by mapping to the string enum values
    houseType: {type: String, enum: ['Apartment', 'Bungalow', 'Castle', 'Loft', 'Tent']},
    roomType: {type: String, enum: ['Entire House', 'Private Room', 'Shared Room']},
    description: String,
    photos: [{type: mongoose.SchemaTypes.Url}],
    rooms: { type: Number, min: 0, max: 20},
    price: Number,
    amenities: [{type: String, enum: ['AC', 'Garden', 'Internet', 'Wifi', 'Pool', 'Washer']}],
    owner: { type: Schema.ObjectId, ref: 'User', required: true } 
}); 

module.exports = mongoose.model('Property', PropertySchema);