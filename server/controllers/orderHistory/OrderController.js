const orderModel = require("../../models/order.model");
var fs = require("fs");

var easyinvoice = require("easyinvoice");
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

exports.getInvoiceById = async (req, res) => {
  var orderId = req.query.id;

  try {
    let ordersInvoice = await orderModel
      .find({ _id: orderId })
      .populate("productsDetails.productId")
      .populate("shippingAddress");

    const {
      name,
      mobileNumber,
      landmark,
      pincode,
      address,
      city,
      state,
      country,
      createdAt,
    } = ordersInvoice[0].shippingAddress;

    const transformedData = ordersInvoice[0].productsDetails.map((item) => ({
      quantity: item.quantity,
      description: item.productId.title,
      price: item.productId.price,
      "tax-rate": 18,
    }));

    var data = {
      // Let's add a recipient
      client: {
        company: name,
        address: address + "," + landmark,
        zip: pincode,
        city: city,
        state: state,
        country: country,
      },

      sender: {
        company: "Succulent Dhaba",
        address: "Kailash Vatika Nursery, Siloti Pandey, Naukuchiatal",
        zip: "263139",
        city: "Nainital",
        country: "India",
      },

      images: {
        //      Logo:
        // 1.   Use a url
        logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
      },

      // Let's add some standard invoice data, like invoice number, date and due-date
      information: {
        // Invoice number
        number: orderId,
        // Invoice data
        date: createdAt,
        // Invoice due date
        "due-date": "31-12-2021",
      },

      // Now let's add some products! Calculations will be done automatically for you.
      products: transformedData,

      // We will use bottomNotice to add a message of choice to the bottom of our invoice
      bottomNotice: "Kindly pay your invoice within 15 days.",

      // Here you can customize your invoice dimensions, currency, tax notation, and number formatting based on your locale
      settings: {
        currency: "INR", // Set the currency to Indian Rupee
        "tax-notation": "gst",
        tax: 18, // Example tax rate (modify as needed)
        description: "Invoice Description",
      },
    };

    easyinvoice.createInvoice(data, function (result) {
      return res.status(200).json({ message: result.pdf });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
