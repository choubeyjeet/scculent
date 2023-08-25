const orderModel = require("../../../models/order.model");
exports.getAllOrders = async (req, res) => {
  const { type, page, perPage } = req.query;
  try {
    let query = {};

    if (type === "all") {
      console.log("all");
      query = {};
    }

    const orderHistory = await orderModel
      .find(query)
      .populate("productsDetails.productId")
      .populate("shippingAddress")
      .populate("userId")
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const count = await orderModel.countDocuments();

    if (orderHistory.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json({ orders: orderHistory, count: count });
  } catch (err) {
    console.log(err);
  }
};

exports.getOrdersById = async (req, res) => {
  const { id } = req.query;
  try {
    const orderHistory = await orderModel
      .find({ _id: id })
      .populate("productsDetails.productId")
      .populate("shippingAddress")
      .populate("userId");

    if (orderHistory.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json({ orders: orderHistory });
  } catch (err) {
    console.log(err);
  }
};
