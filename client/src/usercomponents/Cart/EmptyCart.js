import React from "react";
import "./asset/css/EmptyCart.css";
import svg from "./EmptySvg.svg";
const EmptyCart = () => {
  return (
    <div>
      <div class="empty-cart">
        <img src={svg} alt="empty" />
        <h3>Your Cart is Empty</h3>
      </div>
    </div>
  );
};

export default EmptyCart;
