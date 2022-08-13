const express = require("express");
const { body } = require("express-validator");

const adminController = require("../controllers/admin");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.get("/dashboard", isAdmin, adminController.getDashboard);

router.get("/profile", isAdmin, adminController.getProfile);

router.patch("/accpet-car", isAdmin, adminController.patchAccpetCar);

router.patch("/reject-car", isAdmin, adminController.patchRejectCar);

router.patch("/accept-organizer", isAdmin, adminController.patchAccpetOrganizer);

router.patch("/reject-organizer", isAdmin, adminController.patchRejectOrganizer);

router.get("/", adminController.getAdminSignin);

router.post("/", adminController.postAdminSignin);

router.get("/Organizer-requests", isAdmin, adminController.getOrganizerRequests);

router.post("/admin-logout", adminController.postAdminLogout);

router.get("/Car-requests", isAdmin, adminController.getCarRequests);

router.post("/profile",
    body('admin[email]')
    .isEmail()
    .withMessage('Please enter a valid Email'),
    body('admin[password]','Please enter a password with a minimum 8 characters long')
    .isLength({min: 8}),
    adminController.postUpdateAdmin);

module.exports = router;
