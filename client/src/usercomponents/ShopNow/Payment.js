import React, { useCallback, useEffect, useState } from "react";
import { Radio, RadioGroup, Form } from "rsuite";
import useRazorpay from "react-razorpay";
import { FaCreditCard } from "react-icons/fa";
import "./asset/shopNow.css";
import { useDispatch, useSelector } from "react-redux";
import { getScrectKey } from "../features/shopNow/shopThunk";
import { createOrders, verifyPayment } from "../features/payment/paymentThunk";
export default function Payment() {
  const [Razorpay, isLoaded] = useRazorpay();
  let [screctKeys, setSecretKeys] = useState("");

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
  let { address } = useSelector((state) => state.shopSlice);
  const handleRazorPayment = async (secretKey, data) => {
    let productId = cartItems.items.map((itemId) => {
      return itemId._id;
    });
    let total = totalAmount?.totalTPrice;

    const options = {
      key: secretKey,
      amount: total,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image:
        "https://www.watermarkremover.io/static/public/watermark_remover.jpg",
      order_id: data.order.id,

      handler: async function (response) {
        console.log(response);
        let finalPaymentCheck = await dispatch(
          verifyPayment({ response, productId, totalAmount, address })
        );
        // console.log(finalPaymentCheck);
        // alert(response.razorpay_payment_id);
        // alert("testt", response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
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
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzpay.open();
  };

  const handlePayment = async (key) => {
    let productId = cartItems?.items?.map((itemId, index) => {
      return itemId._id;
    });

    let orders = await dispatch(
      createOrders({ totalAmount, productId, address, currency: "INR" })
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
      <h1>Payment: {isLoading ? "yes" : <>{totalAmount?.totalTPrice}</>}</h1>
      <Form.Group controlId="radioList">
        <RadioGroup name="radioList">
          <Radio value="A">Credit Card</Radio>
          <Radio value="B">Debit Card</Radio>

          <Radio value="C">Gpay</Radio>
          <Radio value="D" disabled>
            Item D
          </Radio>
        </RadioGroup>
        {console.log(screctKeys)}
        <button
          className="payment-button"
          onClick={() => handlePayment(screctKeys)}
        >
          <span className="icon">
            <FaCreditCard />
          </span>
          Pay Now
        </button>
      </Form.Group>
    </div>
  );
}
