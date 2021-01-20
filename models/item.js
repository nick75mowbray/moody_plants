const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    soldOut: {
        type: Boolean,
        required: true,
        default: false
    },
    // images
    imageMain: {
        type: String,
        default: "https://via.placeholder.com/400",
        required: true
    },
    imageTwo: {
        type: String,
        default: "https://via.placeholder.com/400",
        required: true
    },
    imageThree: {
        type: String,
        default: "https://via.placeholder.com/400",
        required: true
    },
    imageFour: {
        type: String,
        default: "https://via.placeholder.com/400",
        required: true
    },
    sizeWidthCM: {
        type: String,
        required: true
    },
    sizeLengthCM: {
        type: String,
        required: true
    },
    sizeWidthInch: {
        type: String,
        required: true
    },
    sizeLengthInch: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);