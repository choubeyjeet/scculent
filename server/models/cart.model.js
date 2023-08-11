const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        tPrice: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);
cartSchema.methods.addToCart = async function (productId, quantity, price) {
  try {
    const existingItem = this.items.find(
      (item) => item.productId.toString() === productId.toString()
    );

    if (existingItem) {
      // If the product already exists in the cart, update the quantity
      existingItem.quantity += quantity;

      // Update the price based on the increased quantity
      existingItem.price = existingItem.quantity * price;
    } else {
      // If the product doesn't exist in the cart, add it as a new item
      const newItem = {
        productId,
        quantity,
        price: quantity * price,
      };
      this.items.push(newItem);
    }

    // Save the updated cart
    await this.save();

    return this;
  } catch (error) {
    throw new Error("Failed to add product to cart.");
  }
};

cartSchema.statics.fetchByCartId = async function (cartId) {
  try {
    const cart = await this.findById(cartId).populate(
      "items.productId",
      "name price"
    );
    if (!cart) {
      throw new Error("Cart not found");
    }
    return cart;
  } catch (error) {
    throw new Error("Failed to fetch cart by ID");
  }
};

cartSchema.methods.updateCart = async function (updatedItems) {
  try {
    this.items = updatedItems;
    await this.save();
    return this;
  } catch (error) {
    throw new Error("Failed to update cart");
  }
};

cartSchema.statics.deleteByCartId = async function (cartId) {
  try {
    const deletedCart = await this.findByIdAndDelete(cartId);
    if (!deletedCart) {
      throw new Error("Cart not found");
    }
    return deletedCart;
  } catch (error) {
    throw new Error("Failed to delete cart");
  }
};

const CartModel = new mongoose.model("Carts", cartSchema);
module.exports = CartModel;
