// const auctions = [
// 	{
// 		timer: Number,
// 		cars: [
// 			{
// 				brand: String,
// 				model: String,
// 				year: Number,
// 				exteriorColor: String,
// 				interiorColor: String,
// 				gearType: String,
// 				Fuel: Number,
// 				milage: Number,
// 				carInspection: String,
// 				notes: String,
// 			},
// 		],
// 	},
// ];


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const auctionSchema = new Schema ({
    cars: [
        {
            year: {
                type: Number,
                required: true
            },
            brand: {
                type: String,
                required: true
            },
            model: {
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
            price: {
                type: Number,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Auction', auctionSchema);
