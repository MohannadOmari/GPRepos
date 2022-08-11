const express = require("express");
const { body } = require("express-validator");

const userController = require("../controllers/user");
const isBidder = require("../middleware/isBidder");

const router = express.Router();

router.get("/user-profile", isBidder, userController.getUserProfile);

router.post("/user-profile",
            body('user[firstName]', 'First name cannot be longer than 15 characters')
                .isLength({max: 15}),
            body('user[lastName]', 'Last name cannot be longer than 15 characters')
                .isLength({max: 15}),
            body('user[phoneNumber]', 'Please enter a valid phone number')
                .isLength({min: 10}),
            body('user[email]')
                .isEmail()
                .withMessage('Please enter a valid Email'),
            body('user[password]','Please enter a password with only numbers and letters and minimum 8 characters long')
                .isLength({min: 8})
                .isAlphanumeric()
                .trim(),
    userController.postUpdateUser);

module.exports = router;
