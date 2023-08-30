const orderModel = require("../../../models/order.model");
const mongoose = require("mongoose");
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

exports.searchOrderById = async (req, res) => {
  const { id } = req.query;

  try {
    const orderHistory = await orderModel.aggregate([
      {
        $addFields: {
          idString: { $toString: "$_id" }, // Convert ObjectId to string
        },
      },
      {
        $match: {
          idString: { $regex: new RegExp("^" + id, "i") },
        },
      },
    ]);

    if (orderHistory.length === 0) {
      return res.status(404).json({ error: "No Orders Found." });
    }

    return res.status(200).json({ orders: orderHistory });
  } catch (err) {
    return res.status(500).json({ error: "An error occurred." });
  }
};

exports.getDataByStatus = async (req, res) => {
  const { status } = req.query;
  try {
    const orderHistory = await orderModel.find({ status: status });
    return res.status(200).json({ orders: orderHistory });
  } catch (err) {
    return res.status(500).json({ error: "An error occurred." });
  }
};
