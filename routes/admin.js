const express = require("express");

const adminController = require("../controllers/admin");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.get("/dashboard", isAdmin, adminController.getDashboard);

router.get("/profile", isAdmin, adminController.getProfile);

router.get("/", adminController.getAdminSignin);

router.post("/", adminController.postAdminSignin);

router.get("/organizer-requests", isAdmin, adminController.getOrganizerRequests);

router.post("/admin-logout", adminController.postAdminLogout);

router.get("/Car-requests", isAdmin, adminController.getCarRequests);

module.exports = router;
