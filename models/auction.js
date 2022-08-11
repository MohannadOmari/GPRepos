// importing mongoose to create our schemas
const mongoose = require('mongoose');

// creating the schema object
const Schema = mongoose.Schema;

// creating the schema to be used for auctions
const auctionSchema = new Schema({

    startDate: {
        type: String,
        // required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    },
    cars: [
        {
           type: Schema.Types.ObjectId,
           ref: 'Car'
        }
    ]
}, { timestamps: true });

// creating the model for auction schema
const Auction = mongoose.model('Auction', auctionSchema);

// exporting Auction schema model
module.exports = Auction;