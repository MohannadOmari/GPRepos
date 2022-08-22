const express = require("express");
const { body } = require("express-validator");

const organizerController = require("../controllers/organizer");
const isOrganizer = require("../middleware/isOrganizer");

const router = express.Router();

router.get("/organizer-profile", isOrganizer, organizerController.getOrganizerProfile);

router.post("/organizer-profile",
    body('org[firstName]', 'First name cannot be longer than 15 characters')
    .isLength({max: 15}),
    body('org[lastName]', 'Last name cannot be longer than 15 characters')
    .isLength({max: 15}),
    body('org[phoneNumber]', 'Please enter a valid phone number')
    .isLength({min: 10}),
    body('org[email]')
    .isEmail()
    .withMessage('Please enter a valid Email'),
    body('org[password]','Please enter a password with only numbers and letters with minimum 8 and maximum 18 characters long')
    .isLength({min: 8, max: 18})
    .isAlphanumeric()
    .trim(),
    organizerController.postUpdateOrganizer);

module.exports = router;