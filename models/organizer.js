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
            /*verification: {
                type: Number
            },*/
            credentials: {
                url: String,
                name: String
            },
            status: {
                type: String,
                default: "Pending"
            }
        
}, { timestamps: true });

const Organizer = mongoose.model('Organizer', organizerSchema);

module.exports = Organizer;