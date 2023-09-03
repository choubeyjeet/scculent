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

exports.updateOrderStatus = async (req, res) => {
  const { status, id } = req.query;
  try {
    const orderStatus = await orderModel.findByIdAndUpdate(
      { _id: id },
      { status: status }
    );

    return res.status(200).json({ message: "Status Updated Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Cannot update the Status." });
  }
};

exports.getOrderByDate = async (req, res) => {
  const { date } = req.query;

  try {
    const dateParts = date.split("-");
    if (dateParts.length !== 3) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Months are zero-based
    const day = parseInt(dateParts[2]);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const parsedDate = new Date(year, month, day);

    const startDate = new Date(parsedDate);
    const endDate = new Date(parsedDate);
    endDate.setDate(endDate.getDate() + 1);

    const orderByDate = await orderModel.find({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    return res.status(200).json({ orders: orderByDate });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getOrderByUserId = async (req, res) => {
  const { id } = req.query;

  try {
    let orders = await orderModel
      .find({ userId: id })
      .populate("productsDetails.productId")
      .populate("shippingAddress")
      .sort({ createdAt: -1 });

    return res.status(200).json({ orders: orders });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
