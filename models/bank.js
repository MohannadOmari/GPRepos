const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bankSchema = {
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Bidder'
    },
    balance: {
        type: Number,
        required: true
    },
    cardInfo: {
        accountNumber: { type: Number, required: true },
        cardName: { type: String, required: true },
        expDate: { type: Date, required: true },
        cvv: { type: Number, required: true }
    },
    transactions: [{
        type: String,
    }]
}

const Bank = mongoose.model('BankAccount', bankSchema);

module.exports = Bank;