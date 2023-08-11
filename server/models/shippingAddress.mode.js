const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema
const addressSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Assuming you have a 'users' collection
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3, // Use 'minlength' instead of 'min'
      maxlength: 50,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    pinCode: {
      type: String,
      required: true,
      trim: true,
    },
    locality: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 100,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 100,
    },
    cityDistrictTown: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      minlength: 10,
      maxlength: 100,
    },
    alternatePhone: {
      type: String,
    },
    addressType: {
      type: String,
      required: true,
      enum: ["home", "work"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create and export the model
const Address = mongoose.model("Address", addressSchema);

module.exports = Address;

const addressModel = new mongoose.model("address", addressSchema);
module.exports = addressModel;
