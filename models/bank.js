const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bankSchema = {
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Bidder'
    },
    balance: {
        type: Number,
        required: true,
        default: 10000
    },
    accountNumber: { 
        type: Number,
        required: true 
    },
    cardName: { 
        type: String,
        required: true 
    },
    expDate: { 
        type: String, 
        required: true 
    },
    ccv: { 
        type: Number, 
        required: true 
    },
    transactions: [{
        type: String,
    }]
}

const BankAccount = mongoose.model('BankAccount', bankSchema);

module.exports = BankAccount;