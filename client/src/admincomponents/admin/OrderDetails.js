import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getOrderById,
  updateOrderStatus,
} from "../features/orderHistory/orderHistoryThunk";
import {
  PanelGroup,
  Panel,
  Whisper,
  Tooltip,
  Row,
  Col,
  Button,
  Modal,
  SelectPicker,
} from "rsuite";

import { ToastContainer, toast } from "react-toastify";
import DateFormat from "../../usercomponents/DateFormat/DateFormat";
import { downloadInvoice } from "../../usercomponents/features/orderHistory/orderHistoryThunk";
import { LoaderDiv } from "../../usercomponents/Home/LoaderDiv";
export const OrderDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleClose = () => setOpen(false);
  const getData = async () => {
    try {
      const response = await dispatch(getOrderById({ id: id }));
      setOrderData(response.payload.data.orders);
      setOrderStatus(response.payload.data.orders[0].status);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
    setIsLoading(false);
  }, [id]);

  const downloadInvoiceOrder = async (orderId) => {
    setIsLoading(true);
    try {
      const response = await dispatch(downloadInvoice({ id: orderId }));
      const base64 = response.payload.data.message;
      const downloadLink = document.createElement("a");

      downloadLink.href = "data:application/pdf;base64," + base64;

      downloadLink.download = orderId + ".pdf";

      downloadLink.click();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const changeOrderStatus = async (id) => {
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      var response = await dispatch(
        updateOrderStatus({ status: selectedStatus, id: id })
      );
      setOpen(false);

      toast(response.payload.data.message);
      getData();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast("Cannot update the status.");
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <LoaderDiv />
        </>
      ) : (
        <>
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
                            {items.userId.firstname +
                              " " +
                              items.userId.lastname}
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
                            <b>Order Status:</b> {items.status}{" "}
                          </p>
                        </div>
                      </Col>
                      <Col md={4}></Col>
                      <Col md={10} style={{ textAlign: "center" }}>
                        <Button
                          appearance="primary"
                          onClick={() => {
                            downloadInvoiceOrder(items._id);
                          }}
                        >
                          Download Invoice
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button
                          appearance="primary"
                          onClick={() => {
                            changeOrderStatus(items._id);
                          }}
                        >
                          Change Status
                        </Button>
                      </Col>
                    </Row>

                    <div>
                      <ul className="orderHistory">
                        {items.productsDetails.map((products, index) => {
                          return (
                            <li key={products.productId._id}>
                              <img
                                src={
                                  products.productId.productImage[0].imageUrl
                                }
                                className="imageIcon"
                                alt={products.productId.title}
                              />
                              <p>
                                {products.productId.title} &nbsp; || &nbsp;
                                Quantity: {products.quantity} &nbsp; || &nbsp;
                                Price: {products.productId.price}
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
          <Modal open={open} onClose={handleClose} size="xs">
            <Modal.Header>
              <Modal.Title>Change Order Status</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
              <Modal.Body>
                {" "}
                <select
                  className="rs-input"
                  required
                  defaultValue={orderStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">--Select Order Status--</option>
                  <option>Order Placed</option>
                  <option>Processing Stock</option>
                  <option>Ready For Packing</option>
                  <option>Ready To Deliver</option>
                  <option>Delivery In Progress</option>
                  <option>Delivered</option>
                  <option>Received</option>
                  <option>Returned</option>
                  <option>Refunded</option>
                  <option>Not Delivered</option>
                </select>
              </Modal.Body>
              <Modal.Footer>
                <Button appearance="primary" type="submit">
                  Update
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
          <ToastContainer />
        </>
      )}
    </>
  );
};
