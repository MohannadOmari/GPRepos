const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BidSchema = new Schema ({
    bid: {
        type: Number,
        default: 0
    },
    bidder: {
        type: Schema.Types.ObjectId,
        ref: 'Bidder'
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: 'Car'
    },
    auction: {
        type: Schema.Types.ObjectId,
        ref: 'Auction'
    }
}, {timestamps: true});

const Bid = mongoose.model('Bid', BidSchema);

module.exports = Bid;