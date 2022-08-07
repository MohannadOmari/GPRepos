const express = require("express");

const adminController = require("../controllers/admin");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.get("/dashboard", isAdmin, adminController.getDashboard);

router.get("/profile", isAdmin, adminController.getProfile);

router.get("/admin-signin", adminController.getAdminSignin);

router.post("/admin-signin", adminController.postAdminSignin);

router.get("/organizer-requests", isAdmin, adminController.getOrganizerRequests);

router.post("/admin-logout", adminController.postAdminLogout);

module.exports = router;
