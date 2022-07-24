const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const organizerSchema = new Schema ({

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
                //required: true
            },
            /*verification: {
                type: Number
            },*/
            credentials: {
                type: String
            }
        
}, { timestamps: true });

const Organizer = mongoose.model('Organizer', organizerSchema);

module.exports = Organizer;