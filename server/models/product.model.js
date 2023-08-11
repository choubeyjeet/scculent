const mongooose = require("mongoose");
const Schema = mongooose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },
    quantity: {
      type: Number,
    },
    discount: {
      type: Number,
      required: true,
    },
    productImage: [
      {
        public_id: {
          type: String,
          required: true,
        },
        imageUrl: {
          type: String,
          required: true,
        },
      },
    ],
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);
const ProductModel = new mongooose.model("products", productSchema);
module.exports = ProductModel;
