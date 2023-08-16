import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { updateCart } from "../features/carts/cartThunk";
import { LoaderDiv } from "../Home/LoaderDiv";

export const Counter = (props) => {
  let dispatch = useDispatch();
  const { productId, quantity, fetchByCart } = props;
  const [cartCount, setCartCount] = useState(quantity);
  const [isLoading, setLoading] = useState(false);
  const handleIncrement = async (key) => {
    setLoading(true);
    setCartCount(cartCount + 1);
    try {
      let response = await dispatch(updateCart({ productId, increment: 1 }));
      setLoading(false);
      fetchByCart();
    } catch (err) {}
  };

  const handleDecrement = async () => {
    setLoading(true);
    if (cartCount > 1) {
      setCartCount(cartCount - 1);
      try {
        let response = await dispatch(updateCart({ productId, decrement: 1 }));
        setLoading(false);
        fetchByCart();
      } catch (err) {}
    }
  };

  return (
    <>
      {isLoading ? (
        <LoaderDiv />
      ) : (
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
      )}
    </>
  );
};
