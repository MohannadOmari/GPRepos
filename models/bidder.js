const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const bidderSchema = new Schema ({
    
            firstName: {
                type: String,
                required: [true, 'Please enter a first name']
            },
            lastName: {
                type: String,
                required: [true, 'Please enter a last name']
            },
            email: {
                type: String,
                required: [true, 'Please enter an email'],
                unique: true,
                lowercase: true,
                validate: [isEmail, 'Please enter a valid email']
            },
            phoneNumber: {
                type: String,
                required: [true, 'Please enter a phone number']
            },
            password: {
                type: String,
                required: [true, 'Please enter a password'],
                minlength: [8, 'Minimum password length is 8 characters']
            },
            wallet: {
                type: Number,
               
            },
            city: {
                type: String,
                required: true
            }//,
           /* verification: {
                type: Number
            }*/
        
}, { timestamps: true });

// encrypt password when new bidder is created
bidderSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

// static method to login user
bidderSchema.statics.signin = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
       const auth = await bcrypt.compare(password, user.password);
       if (auth) {
        return user;
       }
       throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}

const Bidder = mongoose.model('Bidder', bidderSchema);

module.exports = Bidder;