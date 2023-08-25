import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../features/orderHistory/orderHistoryThunk";
import { PanelGroup, Panel, Whisper, Tooltip, Row, Col } from "rsuite";
import DateFormat from "../../usercomponents/DateFormat/DateFormat";

export const OrderDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await dispatch(getOrderById({ id: id }));
        setOrderData(response.payload.data.orders);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [id]);

  return (
    <PanelGroup bordered style={{ marginTop: "5%" }}>
      {orderData.length > 0 &&
        orderData.map((items, key) => {
          return (
            <Panel
              header={
                <div
                  className="header"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h5>Order Placed</h5>
                    <span>
                      <DateFormat timestamp={items.createdAt} />
                    </span>
                  </div>
                  <div>
                    <h5>Total</h5>
                    <span>₹{items.finalAmount}</span>
                  </div>

                  <div>
                    <h5>Ship To</h5>
                    <Whisper
                      placement="bottom"
                      controlId="control-id-hover"
                      trigger="hover"
                      speaker={
                        <Tooltip>
                          {items?.shippingAddress?.address +
                            items?.shippingAddress?.landmark +
                            " " +
                            items?.shippingAddress?.city +
                            " " +
                            items?.shippingAddress?.state}
                        </Tooltip>
                      }
                    >
                      <span>{items?.shippingAddress?.name}</span>
                    </Whisper>
                  </div>

                  <p style={{ fontSize: 12, marginRight: "2%" }}>
                    Order ID: # {items._id}
                  </p>
                </div>
              }
              key={key}
              eventKey={1}
              id="panel1"
            >
              <Row>
                <Col md={10}>
                  <div style={{ marginTop: "3%", marginBottom: "5%" }}>
                    <p>
                      <b>Ordered Placed By:</b>{" "}
                      {items.userId.firstname + " " + items.userId.lastname}
                    </p>
                    <p>
                      <b>Shipping Address:</b>{" "}
                      {items?.shippingAddress?.address +
                        ", " +
                        items?.shippingAddress?.landmark +
                        ", " +
                        items?.shippingAddress?.city +
                        ", " +
                        items?.shippingAddress?.state +
                        ", " +
                        items?.shippingAddress?.pincode +
                        ", " +
                        items?.shippingAddress?.country}
                    </p>
                    <p>
                      <b>Contact Number:</b>{" "}
                      {items.shippingAddress.mobileNumber}
                    </p>
                    <p>
                      <b>Email Address:</b> {items.userId.email}
                    </p>
                    <p>
                      <b>Payment Status:</b> {items.paymentStatus}
                    </p>
                    <p>
                      <b>Payment Status:</b> {items.status}
                    </p>
                  </div>
                </Col>
                <Col md={4}></Col>
                <Col md={10}></Col>
              </Row>

              <div>
                <ul className="orderHistory">
                  {items.productsDetails.map((products, index) => {
                    return (
                      <li key={products.productId._id}>
                        <img
                          src={products.productId.productImage[0].imageUrl}
                          className="imageIcon"
                          alt={products.productId.title}
                        />
                        <p>
                          {products.productId.title} &nbsp; || &nbsp; Quantity:{" "}
                          {products.quantity} &nbsp; || &nbsp; Price:{" "}
                          {products.productId.price}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Panel>
          );
        })}
    </PanelGroup>
  );
};
