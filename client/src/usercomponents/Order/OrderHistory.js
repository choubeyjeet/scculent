import React, { useEffect } from "react";
import NavbarHead from "../Navbar/NavbarHead";
import { useDispatch } from "react-redux";
import { getOrder } from "../features/orders/orderThunk";

const OrderHistory = () => {
  let dispatch = useDispatch();
  let getAllOrders = async () => {
    try {
      let response = await dispatch(getOrder());
      console.log(response.payload);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <>
      <NavbarHead />
    </>
  );
};

export default OrderHistory;
