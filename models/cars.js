const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CarSchema = new Schema ({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Organizer'
    },
    status: {
        type: String,
        default: "Pending"
    },
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
    /* carInspection: {
        type: String
    },
    images: [{
        type: String,
        required: true
    }], */
    price: {
        type: Number,
        required: true,
        default: 0
    },
    notes: {
        type: String,
    }
}, { timestamps: true });

const Car = mongoose.model('Car', CarSchema)

module.exports = Car;