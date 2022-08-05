const express = require("express");
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/user-signup", authController.getUserSignup);

router.get("/user-signin", authController.getUserSignin);

router.post("/user-signin", authController.postUserSignin);

router.post("/logout", authController.postLogout);

router.post("/user-signup",
            body('user[firstName]', 'First name cannot be longer than 15 characters')
                .isLength({max: 15}),
            body('user[lastName]', 'Last name cannot be longer than 15 characters')
                .isLength({max: 15}),
            body('user[phoneNumber]', 'Please enter a valid phone number')
                .isLength({min: 10}),
            body('user[email]')
                .isEmail()
                .withMessage('Please enter a valid Email')
                .normalizeEmail(),
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

router.post("/organizer-signup", authController.postOrganizerSignup);


module.exports = router;
