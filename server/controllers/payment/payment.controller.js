const orderModel = require("../../models/order.model");
const CartModel = require("../../models/cart.model");
const products = require("../../models/product.model");

const { razorpayInstance } = require("../../utils/razorPay");
const crypto = require("crypto");
exports.createOrder = async (req, res) => {
  let loginId = req.user._id;
  try {
    let {
      totalAmount: { totalTPrice, totalQuantity },
      productsData,
      address,
      currency,
    } = req.body;

    // console.log(productImages);

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
      productsData,
      totalAmount: { totalTPrice, totalQuantity },
      address,
      cartID,
    } = req.body;

    const razorpay_signature = req.headers["x-razorpay-signature"];

    const key_secret = process.env.RAZOR_PAY_SECRET;

    //order model insert

    let hmac = crypto.createHmac("sha256", key_secret);

    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);

    const generated_signature = hmac.digest("hex");

    if (razorpay_signature === generated_signature) {
      let productD =
        productsData.length > 0 &&
        productsData.map((data, index) => {
          return { productId: data.ProductId, quantity: data.quantity };
        });

      let newOrder = new orderModel({
        userId: loginId,
        productsDetails: productD,
        finalAmount: totalTPrice,
        shippingAddress: address,
        razorpay_payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
        razorpay_signature: razorpay_signature,
        paymentStatus: "Paid",
        status: "Order Placed",
      });
      await newOrder.save();

      // console.log("Products Details", productD);

      // Update product quantities here
      for (const productDetail of productD) {
        const product = await products.findById(productDetail.productId);
        if (product) {
          if (product.quantity >= productDetail.quantity) {
            product.quantity -= productDetail.quantity;
            await product.save();
          } else {
            console.log(
              `Not enough quantity available for product ID: ${productDetail.productId}`
            );
          }
        }
      }

      await CartModel.deleteOne({ _id: cartID });

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
