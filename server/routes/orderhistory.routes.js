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
  updateOrderStatus,
  getOrderByDate,
  getOrderByUserId,
} = require("../controllers/admin/Order/OrderController");

//orders
router.get("/fetchAllOrders", isAuthenticated, fetchAllOrders);
router.get("/invoice", isAuthenticated, getInvoiceById);

//admin Routes for orderHistory
router.get("/admin/orderHistory", isAuthenticated, isAdmin, getAllOrders);
router.get("/admin/getorderById", isAuthenticated, isAdmin, getOrdersById);
router.get("/admin/searchOrderById", isAuthenticated, isAdmin, searchOrderById);
router.get("/admin/getDataByStatus", isAuthenticated, isAdmin, getDataByStatus);
router.get(
  "/admin/updateOrderStatus",
  isAuthenticated,
  isAdmin,
  updateOrderStatus
);
router.get("/admin/getOrderByDate", isAuthenticated, isAdmin, getOrderByDate);
router.get(
  "/admin/getOrderByUserId",
  isAuthenticated,
  isAdmin,
  getOrderByUserId
);

module.exports = router;
