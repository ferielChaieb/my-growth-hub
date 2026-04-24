const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/authMiddleware");
const { getDashboardStats } = require("../controllers/dashboardController");

router.use(verifyJWT);

router.get("/stats", getDashboardStats);

module.exports = router;