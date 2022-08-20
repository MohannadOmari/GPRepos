const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BidSchema = new Schema ({
    bid: {
        type: Number,
    },
    bidder: {
        type: Schema.Types.ObjectId,
        ref: 'Bidder'
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: 'Car'
    }
}, {timestamps: true});

const Bid = mongoose.model('Bid', BidSchema);

module.exports = Bid;