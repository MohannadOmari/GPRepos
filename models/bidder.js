const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bidderSchema = new Schema ({
    bidder: 
        {
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            username: {
                type: String,
                required: true
            },
            phoneNumber: {
                type: Number,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            wallet: {
                type: Number,
                required: true
            },
            verification: {
                type: Number
            }
        }
});

module.exports = mongoose.model('Bidder', bidderSchema);