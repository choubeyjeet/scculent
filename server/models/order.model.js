const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      required: true,
      ref: "users",
    },
    items: [
      // ... items array details ...
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
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
    toJSON: true,
    timestamps: true,
  }
);
