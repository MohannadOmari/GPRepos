const express = require("express");
const { body } = require("express-validator");
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/user-signup", authController.getUserSignup);

router.get("/user-signin", authController.getUserSignin);

router.post("/user-signin", authController.postUserSignin);

router.post("/logout", authController.postLogout);

router.post("/user-signup",
            body('user[firstName]', 'First name must be between 3 and 15 characters with no numbers')
                .isLength({ min: 3, max: 15 })
                .isAlpha(),
            body('user[lastName]', 'Last name must be between 3 and 15 characters with no numbers')
                .isLength({ min: 3, max: 15 })
                .isAlpha(),
            body('user[phoneNumber]', 'Please enter a valid phone number')
                .isLength({min: 10, max: 10}),
            body('user[email]')
                .isEmail()
                .withMessage('Please enter a valid Email')
                .custom(value => {
                    domain = value.split("@");
                    console.log(domain[1]);
                    if (domain[1].toLowerCase() !== "gmail.com" 
                        && domain[1].toLowerCase() !== "outlook.com"
                        && domain[1].toLowerCase() !== "hotmail.com"
                        && domain[1].toLowerCase() !== "yahoo.com") {
                        throw new Error("Email domain is invalid");
                    }
                    return true;
                }),
            body('user[password]','Please enter a password with only numbers and letters and minimum 8 characters long')
                .isLength({min: 8})
                .isAlphanumeric()
                .trim(),
            body('confirmPassword').trim().custom((value, { req }) => {
                if (value !== req.body.user.password) {
                    throw new Error('Passwords have to match');
                }
                return true;
            }),
            authController.postUserSignup);

router.get("/organizer-signup", authController.getOrganizerSignup);

router.get("/organizer-signin", authController.getOrganizerSignin);

router.post("/organizer-signin", authController.postOrganizerSignin);

router.post("/organizer-signup",
            upload.single('credentials'),
            body('org[firstName]', 'First name must be between 3 and 15 characters with no numbers')
                .isLength({ min: 3, max: 15 })
                .isAlpha(),
            body('org[lastName]', 'Last name must be between 3 and 15 characters with no numbers')
                .isLength({ min: 3, max: 15 })
                .isAlpha(),
            body('org[phoneNumber]', 'Please enter a valid phone number')
                .isLength({min: 10, max: 10}),
            body('org[email]')
                .isEmail()
                .withMessage('Please enter a valid Email')
                .custom(value => {
                    domain = value.split("@");
                    if (domain[1].toLowerCase() !== "gmail.com" 
                        && domain[1].toLowerCase() !== "outlook.com"
                        && domain[1].toLowerCase() !== "hotmail.com"
                        && domain[1].toLowerCase() !== "yahoo.com"){
                        throw new Error("Email domain is invalid");
                    }
                    return true;
                }),
            body('org[password]','Please enter a password with only numbers and letters and minimum 8 characters long')
                .isLength({min: 8})
                .isAlphanumeric()
                .trim(),
            body('confirmPassword').trim().custom((value, { req }) => {
                if (value !== req.body.org.password) {
                    throw new Error('Passwords have to match');
                }
                return true;
            }),
            authController.postOrganizerSignup);


module.exports = router;

