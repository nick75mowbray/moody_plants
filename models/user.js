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
    address: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        zip: {
            type: String
        }
    },
    sub: {
        type: String
    }

});

module.exports = User = mongoose.model('users', UserSchema);