// importing mongoose to create our schemas
const mongoose = require('mongoose');

// creating the schema object
const Schema = mongoose.Schema;

// creating the schema to be used for auctions
const auctionSchema = new Schema({

    startDate: {
        type: Date,
        // required: true
    },
    finishDate: {
        type: Date,
        // required: true
    },
    cars: [
        {
            brand: {
                type: String,
                required: true
            },
            model: {
                type: String,
                required: true
            },
            year: {
                type: String,
                required: true
            },
            fuel: {
                type: String,
                required: true
            },
            mileage: {
                type: Number,
                required: true
            },
            gearType: {
                type: String,
                required: true
            },
            interiorColor: {
                type: String,
                required: true
            },
            exteriorColor: {
                type: String,
                required: true
            },
            /* carInspection: [{
                type: String
            }],
            pictures: [{
                type: String,
                required: true
            }], */
            price: {
                type: Number,
                required: true
            },
            notes: {
                type: String,
            }
        }
    ]
}, { timestamps: true });

// creating the model for auction schema
const Auction = mongoose.model('Auction', auctionSchema);

// exporting Auction schema model
module.exports = Auction;