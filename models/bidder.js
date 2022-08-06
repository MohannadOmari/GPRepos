const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

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
               
            },
            city: {
                type: String,
                required: true
            },
            bankAccount: {
                type: Schema.Types.ObjectId,
                ref: 'Bank'
            },/* 
            verification: {
                type: Number
            } */
        
}, { timestamps: true });

// encrypt password when new bidder is created
BidderSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

/* // static method to login user
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
} */

const Bidder = mongoose.model('Bidder', BidderSchema);

module.exports = Bidder;