const express = require("express");
const { isAuthenticated, isAdmin } = require("../middleware/jwtVerify");
const {
  createCategory,
  editCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
} = require("../controllers/admin/Category/CatergoryController");
const router = express.Router();
const { upload } = require("../utils/multerConfig");
router.post(
  "/createcategory",
  isAuthenticated,
  isAdmin,
  upload.array("productImage", 1),
  createCategory
);
router.get("/getallcategory", getAllCategory);
router.post("/deletecategorybyid", isAuthenticated, isAdmin, deleteCategory);

module.exports = router;
