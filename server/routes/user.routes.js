const express = require("express");
const {
  Register,
  fetchAllUser,
  Login,
  refreshToken,
  forgetPassword,
  resetPassword,
  singleUser,
  status,
} = require("../controllers/user/userController");
const { isAuthenticated, isAdmin } = require("../middleware/jwtVerify");
const {
  fetchAllCarts,
  addToCart,
  updateCart,
  deleteCart,
  updateCartItem,
  deleteCartItem,
  checkProductInCart,
} = require("../controllers/cart/cart.controller");
const { contactUs } = require("../controllers/contact/ContactUsController");

const router = express.Router();

//userRoutes
router.post("/register", Register);
router.post("/login", Login);
router.get("/profile/:id", singleUser);
router.post("/refreshToken", refreshToken);
router.get("/userStatus", isAuthenticated, status);
router.post("/changePassword", isAuthenticated);

//add to Cart Methods
router.get("/getCart", isAuthenticated, fetchAllCarts);
router.post("/addToCart", isAuthenticated, addToCart);
router.put("/updateCart", isAuthenticated, updateCartItem);
router.post("/deleteCart", isAuthenticated, deleteCartItem);
router.get("/getcartitem", isAuthenticated, checkProductInCart);

//forget

router.get("/forgetPassword", forgetPassword);
router.put("/resetPassword/:token", resetPassword);

//admin routes
router.get("/fetchAllUser", fetchAllUser);

router.post("/contactus", contactUs);

module.exports = router;
