const CartModel = require("../../models/cart.model");

exports.fetchAllCarts = async (req, res, next) => {
  let userId = req.query.userId; // Assuming the user ID is provided in the request body

  try {
    let carts = await CartModel.find({ userId }).populate(
      "userId items.productId"
    ); // Find all carts for the specified user ID

    const totalTPrice = carts[0].items.reduce(
      (accumulator, element) => {
        accumulator.totalTPrice += element.tPrice;
        accumulator.totalQuantity += element.quantity;
        return accumulator;
      },
      { totalTPrice: 0, totalQuantity: 0 }
    );
    return res
      .status(200)
      .json({ message: "Carts fetched successfully", carts, totalTPrice });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.addToCart = async (req, res, next) => {
  const { productId } = req.body;
  let quantity = +req.body.quantity;
  let price = +req.body.price;

  try {
    let cart = await CartModel.findOne({ userId: req.user._id });

    if (!cart) {
      // Create a new cart if it doesn't exist for the user
      cart = new CartModel({ userId: req.user._id });
    }

    // Check if the product already exists in the cart
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId.toString()
    );

    if (existingItem) {
      // If the product already exists, update the quantity
      existingItem.quantity += quantity;
      // Update the price based on the increased quantity
      existingItem.price = existingItem.quantity * price;
    } else {
      // If the product doesn't exist, add it as a new item
      cart.items.push({
        productId,
        quantity,
        price: price,
        tPrice: price,
      });
    }

    await cart.save();
    return res
      .status(200)
      .json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    return res.status(500).json({ statys: "sd", error: error.message });
  }
};

exports.updateCartItem = async (req, res, next) => {
  const { productId, increment, decrement } = req.body;

  try {
    const cart = await CartModel.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId.toString()
    );
    if (!existingItem) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    // Update the quantity and price of the item
    if (increment) {
      // Increment the quantity and adjust the price
      existingItem.quantity += +increment;

      existingItem.tPrice = existingItem.quantity * existingItem.price;
    }

    if (decrement) {
      // Decrement the quantity and adjust the price
      if (existingItem.quantity > 1) {
        existingItem.quantity -= +decrement;

        existingItem.tPrice = existingItem.quantity * existingItem.price;
      }
    }

    await cart.save();

    return res
      .status(200)
      .json({ message: "Cart item updated successfully", cart });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteCartItem = async (req, res, next) => {
  const { productId, userId } = req.body;
  let loginId = req.user._id;

  try {
    // if (loginId !== userId) {
    //   return res.status(400).json({ error: "Invalid Login Id." });
    // }

    const cart = await CartModel.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (existingItemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    cart.items.splice(existingItemIndex, 1);

    await cart.save();

    return res
      .status(200)
      .json({ message: "Cart item deleted successfully", cart });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.checkProductInCart = async (req, res, next) => {
  let userId = req.query.userId; // Assuming the user ID is provided in the request body
  let productId = req.query.productId;
  try {
    let carts = await CartModel.find({ userId }).populate(
      "userId items.productId"
    ); // Find all carts for the specified user ID
    const products = carts[0].items;

    const filteredProducts = products.filter(
      (product) => product.productId._id.toString() === productId
    );

    if (filteredProducts.length > 0) {
      return res.status(200).json({ message: "Product Id exists" });
    } else {
      return res.status(400).json({ message: "Product Id not exits" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
