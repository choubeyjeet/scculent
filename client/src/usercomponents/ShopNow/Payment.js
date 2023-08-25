import React, { useEffect, useState } from "react";
import { Radio, RadioGroup, Form } from "rsuite";
import useRazorpay from "react-razorpay";
import { FaCreditCard } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

import "./asset/shopNow.css";
import { useDispatch, useSelector } from "react-redux";
import { getScrectKey } from "../features/shopNow/shopThunk";
import { createOrders, verifyPayment } from "../features/payment/paymentThunk";
import { useNavigate } from "react-router-dom";
export default function Payment() {
  const [Razorpay, isLoaded] = useRazorpay();
  let [screctKeys, setSecretKeys] = useState("");

  const navigate = useNavigate();

  let dispatch = useDispatch();
  let getKey = async () => {
    try {
      let response = await dispatch(getScrectKey());
      let {
        data: { secretKey },
      } = response.payload;

      setSecretKeys(secretKey);
    } catch (error) {}
  };

  useEffect(() => {
    getKey();
  }, []);
  let { isLoading, totalAmount, cartItems } = useSelector(
    (state) => state.cartSlice
  );
  let { user } = useSelector((state) => state.userSlice);
  let { address } = useSelector((state) => state.shopSlice);
  const handleRazorPayment = async (secretKey, data) => {
    let productsData = cartItems?.items?.map((itemId, index) => {
      return { ProductId: itemId.productId._id, quantity: itemId.quantity };
    });

    let total = totalAmount?.totalTPrice;

    const options = {
      key: secretKey,
      amount: total,
      currency: "INR",
      name: "Scculent Dhaba",
      description: "Test Transaction",
      image:
        "https://www.watermarkremover.io/static/public/watermark_remover.jpg",
      order_id: data.order.id,

      handler: async function (response) {
        let finalPaymentCheck = await dispatch(
          verifyPayment({
            response,
            productsData,
            totalAmount,
            address,
            cartID: cartItems._id,
          })
        );

        if (finalPaymentCheck.payload.success === true) {
          navigate("/orderHistory");
        }
      },
      prefill: {
        name: `${user.firstname} ${user.lastname}`,
        email: `${user.email}`,
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.on("payment.failed", function (response) {
      toast.error("Payment is not successful.");
    });

    rzpay.open();
  };

  const handlePayment = async (key) => {
    let productsData = cartItems?.items?.map((itemId, index) => {
      return { ProductId: itemId.productId._id, quantity: itemId.quantity };
    });
    let orders = await dispatch(
      createOrders({ totalAmount, productsData, address, currency: "INR" })
    );

    handleRazorPayment(key, orders.payload);
  };

  useEffect(() => {
    if (isLoaded) {
      handlePayment();
    }
  }, [isLoaded, handlePayment]);

  return (
    <div>
      <button
        className="payment-button"
        onClick={() => handlePayment(screctKeys)}
      >
        <span className="icon">
          <FaCreditCard />
        </span>
        Pay Now
      </button>
      <ToastContainer />
    </div>
  );
}
