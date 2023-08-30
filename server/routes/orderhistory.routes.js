const express = require("express");

const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middleware/jwtVerify");
const {
  fetchAllOrders,
  getInvoiceById,
} = require("../controllers/orderHistory/OrderController");
const {
  getAllOrders,
  getOrdersById,
  searchOrderById,
  getDataByStatus,
} = require("../controllers/admin/Order/OrderController");

//orders
router.get("/fetchAllOrders", isAuthenticated, fetchAllOrders);
router.get("/invoice", isAuthenticated, getInvoiceById);

//admin Routes for orderHistory
router.get("/admin/orderHistory", isAuthenticated, isAdmin, getAllOrders);
router.get("/admin/getorderById", isAuthenticated, isAdmin, getOrdersById);
router.get("/admin/searchOrderById", isAuthenticated, isAdmin, searchOrderById);
router.get("/admin/getDataByStatus", isAuthenticated, isAdmin, getDataByStatus);

module.exports = router;
