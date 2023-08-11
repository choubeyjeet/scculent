const express = require("express");
const {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  deleteImageFromProduct,
  getByProductId,
} = require("../controllers/productController");
const { upload } = require("../utils/multerConfig");
const { isAuthenticated, isAdmin } = require("../middleware/jwtVerify");
const router = express.Router();

router.get("/fetchAllProducts", getProducts);
router.get("/productById/:id", getByProductId);
router.post(
  "/createProduct",
  isAuthenticated,
  isAdmin,
  upload.array("productImage", 5),
  createProduct
);
router.put(
  "/updateProduct/:id",
  isAuthenticated,
  isAdmin,
  upload.array("productImage", 5),
  updateProduct
);
router.post("/deleteProduct/:id", isAuthenticated, isAdmin, deleteProduct);

router.post("/deleteImage", isAuthenticated, isAdmin, deleteImageFromProduct);

module.exports = router;
