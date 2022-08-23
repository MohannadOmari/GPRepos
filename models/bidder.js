const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BidderSchema = new Schema ({
    
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
                required: true,
                unique: true,
                lowercase: true,
            },
            phoneNumber: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            wallet: {
                type: Number,
                default: 0
            },
            city: {
                type: String,
                required: true
            },
            bankAccount: {
                type: Schema.Types.ObjectId,
                ref: 'BankAccount'
            },
            cars: [{
                type: Schema.Types.ObjectId,
                ref: 'Car',
                default: []
            }]
        
}, { timestamps: true });

const Bidder = mongoose.model('Bidder', BidderSchema);

module.exports = Bidder;