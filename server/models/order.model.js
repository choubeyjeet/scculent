const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      required: true,
      ref: "users",
    },
    productsId: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "products",
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
      enum: ["pending", "paid", "failed"],
      default: "pending",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let orderModel = new mongoose.model("orders", orderSchema);
module.exports = orderModel;
