import React, { useState, useEffect } from "react";
import {
  Drawer,
  Whisper,
  Tooltip,
  PanelGroup,
  Panel,
  Grid,
  Row,
  Col,
} from "rsuite";
import { getOrderByUserId } from "../../features/orderHistory/orderHistoryThunk";
import { useDispatch } from "react-redux";
import DateFormat from "../../../usercomponents/DateFormat/DateFormat";

import { LoaderDiv } from "../../../usercomponents/Home/LoaderDiv";

export const UserInfoModel = (props) => {
  const { open, setOpen, userID } = props;

  const [loading, setLoading] = useState(true);
  let [orderHistory, setOrderHistory] = useState([]);

  const setOpenD = async () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    let fetchData = async () => {
      try {
        var userData = await dispatch(getOrderByUserId({ id: userID }));

        setOrderHistory(userData.payload.data.orders);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    fetchData();
  }, [open]);

  const userInformation = () => {
    return (
      <>
        {console.log(orderHistory)}
        <Grid fluid>
          <Row className="show-grid">
            <Col md={24}>
              <PanelGroup accordion bordered>
                {orderHistory?.length > 0 &&
                  orderHistory?.map((items, key) => {
                    return (
                      <Panel
                        eventKey={key}
                        id={`panel${key}`}
                        header={
                          <div
                            className="header"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <h6>Order Placed</h6>
                              <span>
                                <DateFormat timestamp={items.createdAt} />
                              </span>
                            </div>
                            <div>
                              <h6>Total</h6>
                              <span>₹{items.finalAmount}</span>
                            </div>
                            <div>
                              <h6>Ship To</h6>
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
                              Order ID: # {items._id} &nbsp;&nbsp;
                            </p>
                          </div>
                        }
                        key={key}
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
                                    {products.productId.title} &nbsp; || &nbsp;
                                    Quantity: {products.quantity} &nbsp; ||
                                    &nbsp; Price: {products.productId.price}
                                  </p>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </Panel>
                    );
                  })}
                {orderHistory?.length === 0 && <>No Records Found</>}
              </PanelGroup>
            </Col>
          </Row>
        </Grid>
      </>
    );
  };

  return (
    <>
      <Drawer size="md" open={open} onClose={setOpenD}>
        <Drawer.Header>
          <Drawer.Title>User Order History</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
          {loading ? <LoaderDiv /> : <>{userInformation()}</>}
        </Drawer.Body>
      </Drawer>
    </>
  );
};
