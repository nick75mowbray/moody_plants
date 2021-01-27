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
    inventory: {
        type: Number,
        required: true,
        default: 0
    },
    // images
    images: {
        type: Array,
        required: true
    },
    size: {
        metric: {
            width: {
                type: Number,
                required: true,
            },
            height: {
                type: Number,
                required: true
            }
        },
        imperial: {
            width: {
                type: Number,
                required: true,
            },
            height: {
                type: Number,
                required: true
            }
        }
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    views: {
        type: Number
    },

});

module.exports = Item = mongoose.model('item', ItemSchema);