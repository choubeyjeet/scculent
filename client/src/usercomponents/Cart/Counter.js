import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { updateCart } from "../features/carts/cartThunk";

export const Counter = (props) => {
  let dispatch = useDispatch();
  const { productId, quantity } = props;
  const [cartCount, setCartCount] = useState(quantity);
  const handleIncrement = async (key) => {
    setCartCount(cartCount + 1);
    let response = await dispatch(updateCart({ productId, increment: 1 }));
  };

  const handleDecrement = async () => {
    if (cartCount > 1) {
      setCartCount(cartCount - 1);
      let response = await dispatch(updateCart({ productId, decrement: 1 }));
    }
  };

  return (
    <>
      <span style={{ fontSize: "15px" }}>
        <b>Items in cart: {cartCount}</b>
      </span>
      <button onClick={() => handleDecrement()} className="decrementBtn">
        <AiOutlineMinus />
      </button>
      <button onClick={() => handleIncrement()} className="incrementBtn">
        <AiOutlinePlus />
      </button>
    </>
  );
};
