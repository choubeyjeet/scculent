const orderModel = require("../../models/order.model");
const { razorpayInstance } = require("../../utils/razorPay");
const crypto = require("crypto");
exports.createOrder = async (req, res) => {
  let loginId = req.user._id;
  try {
    let {
      totalAmount: { totalTPrice, totalQuantity },
      productId,
      address,
      currency,
    } = req.body;

    razorpayInstance.orders.create(
      { amount: totalTPrice * 100, currency },
      (err, order) => {
        if (!err) res.json({ order, totalQuantity });
        else res.status(500).json({ error: err });
      }
    );
    // return res.status(200).json({ message: "ok order created successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.verifyOrder = async (req, res) => {
  let loginId = req.user._id;
  try {
    const { razorpay_order_id, razorpay_payment_id } = req.body.response;

    let {
      productId,
      totalAmount: { totalTPrice, totalQuantity },
      address,
    } = req.body;

    const razorpay_signature = req.headers["x-razorpay-signature"];

    const key_secret = process.env.RAZOR_PAY_SECRET;

    //order model insert

    let hmac = crypto.createHmac("sha256", key_secret);

    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);

    const generated_signature = hmac.digest("hex");

    if (razorpay_signature === generated_signature) {
      let newOrder = new orderModel({
        userId: loginId,
        productsId: productId,
        finalAmount: totalTPrice,
        shippingAddress: address,
        razorpay_payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
        razorpay_signature: razorpay_signature,
        paymentStatus: "paid",
        status: "processing",
      });
      await newOrder.save();
      return res.status(200).json({
        success: true,
        message: "Payment has been verified",
        newOrder,
      });
    } else
      return res.status(500).json({
        success: false,
        message: "Payment verification failed",
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.fetchAllOrders = async (req, res) => {
  try {
    let orders = await orderModel
      .find()
      .populate("productsId shippingAddress", null, null, {
        strictPopulate: false,
      });

    if (orders.length === 0) {
      return res.status(400).json({ error: "No orders found." });
    }

    return res.status(200).json({ message: "Order Fetched.", orders });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
