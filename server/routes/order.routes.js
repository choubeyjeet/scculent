const express = require("express");
const {
  createOrder,
  verifyOrder,
  fetchAllOrders,
} = require("../controllers/payment/payment.controller");
const { isAuthenticated } = require("../middleware/jwtVerify");
const router = express.Router();

router.post("/createOrder", isAuthenticated, createOrder);
router.post("/verifyOrder", isAuthenticated, verifyOrder);
router.get("/secretKey", (req, res) => {
  try {
    return res.status(200).json({ secretKey: process.env.RAZOR_PAY_ID });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
