const express = require("express");
const { isAuthenticated, isAdmin } = require("../middleware/jwtVerify");
const { getInbox } = require("../controllers/inbox/getInboxController");

const router = express.Router();

router.get("/inbox", isAdmin, isAuthenticated, getInbox);

module.exports = router;
