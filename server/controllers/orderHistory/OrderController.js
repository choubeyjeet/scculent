const orderModel = require("../../models/order.model");

exports.fetchAllOrders = async (req, res) => {
  try {
    let user_id = req.user._id;

    let orders = await orderModel
      .find({ userId: user_id })
      .populate("productsDetails.productId")
      .populate("shippingAddress")
      .sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(400).json({ error: "No orders found." });
    }

    return res.status(200).json({ message: "Order Fetched.", orders });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
