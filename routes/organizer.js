const express = require("express");
const { body } = require("express-validator");

const organizerController = require("../controllers/organizer");
const isOrganizer = require("../middleware/isOrganizer");

const router = express.Router();

router.get("/organizer-profile", isOrganizer, organizerController.getOrganizerProfile);

router.post("/organizer-profile",
body('org[firstName]', 'First name must be between 3 and 15 characters with no numbers')
                .isLength({ min:3 ,max: 15})
                .isAlpha(),
            body('org[lastName]', 'Last name must be between 3 and 15 characters with no numbers')
                .isLength({min:3 ,max: 15}),
            body('org[phoneNumber]', 'Please enter a valid phone number')
                .isLength({min: 10}),
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
    body('org[password]','Please enter a password with only numbers and letters with minimum 8 and maximum 18 characters long')
    .isLength({min: 8, max: 18})
    .isAlphanumeric()
    .trim(),
    organizerController.postUpdateOrganizer);

module.exports = router;