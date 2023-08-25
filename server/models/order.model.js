const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      required: true,
      ref: "users",
    },
    productsDetails: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "products",
        },
        quantity: {
          type: String,
          required: true,
        },
      },
    ],

    finalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    razorpay_order_id: {
      type: String,
      required: true,
    },
    razorpay_signature: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered"],
      default: "Pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let orderModel = new mongoose.model("orders", orderSchema);
module.exports = orderModel;
