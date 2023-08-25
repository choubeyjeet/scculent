import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "rsuite";

export default function OrderDetails() {
  const [orderCart, setOrderCart] = useState([]);
  const { cartItems } = useSelector((state) => state.cartSlice);

  return (
    <>
      <div>
        {cartItems.items?.map((item, index) => {
          return (
            <>
              <Row className="show-grid cartItems " key={item.productId._id}>
                <Col md={2} sm={0} xs={0}></Col>
                <Col md={5} sm={24} xs={24}>
                  <img
                    src={item.productId.productImage[0].imageUrl}
                    height="auto"
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col md={1} sm={0} xs={0}></Col>
                <Col md={15} sm={24} xs={24}>
                  <p style={{ fontSize: "24px" }}>{item.productId.title}</p>
                  <p>
                    <b style={{ fontSize: "24px" }}>₹{item.productId.price}</b>
                  </p>
                  <p>
                    <span>Quantity: {item.quantity}</span>
                  </p>
                </Col>
              </Row>
            </>
          );
        })}
      </div>
    </>
  );
}
