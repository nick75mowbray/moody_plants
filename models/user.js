const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
        street: {
            type: String
        },
        city: {
            type: String
        },
        zip: {
            type: Number
        }
    ,
    sub: {
        type: String
    }

});

module.exports = User = mongoose.model('users', UserSchema);