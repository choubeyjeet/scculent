const addressModel = require("../../models/address.model");
const { addressSchemaValidation } = require("../../utils/validation");

exports.createAddress = async (req, res, next) => {
  let loginId = req.user._id;

  let { error, value } = addressSchemaValidation.validate(
    req.body.addressbyID,
    addressModel
  );
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    let isMobileNumberExist = await addressModel.findOne({
      mobileNumber: value.mobileNumber,
    });
    if (isMobileNumberExist) {
      return res.status(400).json({ error: "This number already in use" });
    }
    let userAddress = new addressModel({
      userId: loginId,
      name: value.name,
      mobileNumber: value.mobileNumber,
      pincode: value.pincode,
      address: value.address,
      city: value.city,
      state: value.state,
      landmark: value.landmark,
      country: value.country,
    });
    await userAddress.save();

    return res.status(200).json({
      message: "Address created successfully",
      userAddress: userAddress,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.getAddress = async (req, res, next) => {
  let { userId } = req.query;

  try {
    let userAddress = await addressModel.find({ userId: { $in: userId } });

    if (userAddress.length < 0) {
      return res.status(400).json({ error: "Address not found." });
    }
    return res.status(200).json({ address: userAddress });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getAddressById = async (req, res, next) => {
  let { id } = req.params;
  let loginId = req.user._id;

  try {
    let userAddress = await addressModel.findOne({
      _id: id,
      userId: loginId,
    }); // Assuming userId is the field that links addresses to users
    if (!userAddress) {
      return res
        .status(400)
        .json({ error: "Address not found or unauthorized." });
    }
    return res.status(200).json({ address: userAddress });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateAddressById = async (req, res, next) => {
  const { id } = req.params; // Assuming the addressId is in the URL params
  const updatedData = req.body.addressbyID; // Assuming the updated data is in the request body

  try {
    const updatedAddress = await addressModel.findByIdAndUpdate(
      { _id: id },
      updatedData,
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(400).json({ error: "Address not found." });
    }

    return res.status(200).json({
      message: "Address Update Successfully.",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteAddressById = async (req, res, next) => {
  const { id } = req.params; // Assuming the addressId is in the URL params

  try {
    const deletedAddress = await addressModel.findByIdAndRemove({ _id: id });

    if (!deletedAddress) {
      return res.status(400).json({ error: "Address not found." });
    }

    return res.status(200).json({ message: "Address deleted successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
