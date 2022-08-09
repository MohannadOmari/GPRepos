const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// encrypt password when new organizer is created
organizerSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    next();
})

const Organizer = mongoose.model('Organizer', organizerSchema);

module.exports = Organizer;