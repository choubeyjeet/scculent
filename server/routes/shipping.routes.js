const express = require("express");
const {
  createAddress,
  getAddressById,
  getAddress,
  updateAddressById,
  deleteAddressById,
} = require("../controllers/address/address.controller");
const { isAuthenticated } = require("../middleware/jwtVerify");
const router = express.Router();

router.get("/fetchAddress/", getAddress);
router.get("/addressById/:id", isAuthenticated, getAddressById);
router.post("/createAddress", isAuthenticated, createAddress);
router.put("/updateAddress/:id", isAuthenticated, updateAddressById);
router.delete("/deleteAddress/:id", isAuthenticated, deleteAddressById);

module.exports = router;
