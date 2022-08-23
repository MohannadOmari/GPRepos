const express = require("express");
const { body } = require("express-validator");

const userController = require("../controllers/user");
const isBidder = require("../middleware/isBidder");

const router = express.Router();

router.get("/user-profile", isBidder, userController.getUserProfile);

router.post("/user-profile",
            body('user[firstName]', 'First name cannot be longer than 15 characters')
                .isLength({ min: 3,max: 15 }),
            body('user[lastName]', 'Last name cannot be longer than 15 characters')
                .isLength({ min: 3,max: 15 }),
            body('user[phoneNumber]', 'Please enter a valid phone number')
                .isLength({ min: 10, max: 10 }),
            body('user[email]')
                .isEmail()
                .withMessage('Please enter a valid Email'),
            body('user[password]','Please enter a password with only numbers and letters with minimum 8 and maximum 18 characters long')
                .isLength({ min: 8, max: 18 })
                .isAlphanumeric()
                .trim(),
    userController.postUpdateUser);

router.get("/card-info", );

router.post("/card-info",
    body('backAccountNumber', 'Not a valid card number')
        .isLength({min: 16, max: 16}),
    body('expireYY')
        .custom(value => {
             year = new Date().getFullYear().toString().split("20");
            if (value < year[1]) {
                throw new Error('Card expired')
            }
            return true;
        }),
    body('CCV', 'Wrong CCV')
        .isLength({ min: 3, max: 3 }),
    userController.postAddBankAccount);

router.post("/balance", userController.postAddBalance);

module.exports = router;
