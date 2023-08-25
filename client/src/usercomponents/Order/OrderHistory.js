import React, { useEffect, useState } from "react";
import NavbarHead from "../Navbar/NavbarHead";
import { useDispatch } from "react-redux";
import "./assets/css/orderHistory.css";
import Footer from "../Footer/Footer";
import {
  Row,
  Col,
  Panel,
  Placeholder,
  Grid,
  PanelGroup,
  Tooltip,
  Whisper,
  Button,
} from "rsuite";
import { getOrderHistory } from "../features/orderHistory/orderHistoryThunk";
import DateFormat from "../DateFormat/DateFormat";
import { LoaderDiv } from "../Home/LoaderDiv";
const OrderHistory = () => {
  let [orderHistory, setOrderHistory] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let dispatch = useDispatch();
  let getAllOrders = async () => {
    try {
      let response = await dispatch(getOrderHistory());
      let { orders } = response.payload.data;
      setOrderHistory(orders);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, []);
  const tooltip = (
    <Tooltip>
      This is a help <i>tooltip</i> .
    </Tooltip>
  );
  return (
    <>
      <NavbarHead />
      {isLoading ? (
        <LoaderDiv />
      ) : (
        <>
          <Grid style={{ width: "100%" }}>
            <h1 className="trendingHead" style={{ marginTop: 20 }}>
              Your Orders
            </h1>
            <Row>
              <Col md={2}></Col>
              <Col md={20}>
                <PanelGroup accordion bordered>
                  {orderHistory.length > 0 &&
                    orderHistory.map((items, key) => {
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
                          <div>
                            <ul className="orderHistory">
                              {items.productsDetails.map((products, index) => {
                                return (
                                  <li key={products.productId._id}>
                                    <img
                                      src={
                                        products.productId.productImage[0]
                                          .imageUrl
                                      }
                                      className="imageIcon"
                                      alt={products.productId.title}
                                    />
                                    <p>
                                      {products.productId.title} &nbsp; ||
                                      &nbsp; Quantity: {products.quantity}{" "}
                                      &nbsp; || &nbsp; Price:{" "}
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
              </Col>
              <Col md={2}></Col>
            </Row>
          </Grid>
        </>
      )}
      <Footer />
    </>
  );
};

export default OrderHistory;
