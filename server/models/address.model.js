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
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const addressModel = new mongoose.model("address", addressSchema);
module.exports = addressModel;
