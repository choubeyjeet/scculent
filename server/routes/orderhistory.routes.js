const express = require("express");

const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middleware/jwtVerify");
const {
  fetchAllOrders,
} = require("../controllers/orderHistory/OrderController");
const {
  getAllOrders,
  getOrdersById,
} = require("../controllers/admin/Order/OrderController");

//orders
router.get("/fetchAllOrders", isAuthenticated, fetchAllOrders);

//admin Routes for orderHistory
router.get("/admin/orderHistory", isAuthenticated, isAdmin, getAllOrders);
router.get("/admin/getorderById", isAuthenticated, isAdmin, getOrdersById);

module.exports = router;
