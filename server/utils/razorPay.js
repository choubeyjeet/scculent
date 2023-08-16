const Razorpay = require("razorpay");

exports.razorpayInstance = new Razorpay({
  key_id: process.env.RAZOR_PAY_ID,
  key_secret: process.env.RAZOR_PAY_SECRET,
});
