const paymentSchema = new Schema(
  {
    orderId: {
      type: Schema.ObjectId,
      required: true,
      ref: "Order",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
      required: true,
    },
    paymentDetails: {
      // Include the necessary fields for payment details, such as payment ID, transaction details, etc.
    },
  },
  {
    toJSON: true,
    timestamps: true,
  }
);

const PaymentModel = mongoose.model("Payment", paymentSchema);
