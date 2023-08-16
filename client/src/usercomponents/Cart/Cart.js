import { useEffect, useState } from "react";
import { Grid, Row, Button, Col, Divider } from "rsuite";
import { Link } from "react-router-dom";
import { BsFillTrash3Fill } from "react-icons/bs";

import NavbarHead from "../Navbar/NavbarHead";
import Footer from "../Footer/Footer";

import "./asset/css/Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, fetchCart } from "../features/carts/cartThunk";
import { Counter } from "./Counter";
import { LoaderDiv } from "../Home/LoaderDiv";
import EmptyCart from "./EmptyCart";
import { AlertConfirm } from "../Utils/alertConfirm";
export default function Cart() {
  const [cartItem, setCartItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalSum, setTotalSum] = useState({});
  let userId = localStorage.getItem("userid");
  const [cartID, setCartID] = useState("");
  const [open, setDeleteopen] = useState(false);
  const [deleteId, setDeleteItem] = useState("");
  let dispatch = useDispatch();

  let {
    user: { _id },
  } = useSelector((state) => state.userSlice);
  const fetchByCart = async () => {
    try {
      const response = await dispatch(fetchCart(userId));
      setIsLoading(false);
      setCartItem(response.payload.data.carts[0].items);
      setCartID(response.payload.data.carts[0]._id);
      setTotalSum(response.payload.data.totalTPrice);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchByCart();
  }, []);

  const setDeleteID = (id) => {
    setDeleteItem(id);

    setDeleteopen(true);
  };

  const toDeleteByID = async (productId) => {
    setIsLoading(true);
    try {
      let response = await dispatch(
        deleteCart({ productId: productId, userId: _id })
      );
      let { data, status } = response.payload;
      fetchByCart();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <LoaderDiv />
      ) : (
        <>
          <NavbarHead fetchByCart={fetchByCart} />
          <br />
          <h3 style={{ textAlign: "center" }}>Shopping Cart</h3>
          <Grid fluid>
            <Row>
              {cartItem.length === 0 ? (
                <Col md={24}>
                  <Row>
                    <Col md={24}>
                      <EmptyCart />
                    </Col>
                  </Row>
                </Col>
              ) : (
                <>
                  <Col md={17}>
                    {cartItem?.map((item, index) => {
                      return (
                        <>
                          <Row
                            className="show-grid cartItems"
                            key={item.productId._id}
                          >
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
                              <p style={{ fontSize: "24px" }}>
                                {item.productId.title}
                              </p>
                              <p>
                                <b style={{ fontSize: "24px" }}>
                                  ₹{item.productId.price}
                                </b>
                              </p>
                              <Counter
                                productId={item.productId._id}
                                quantity={item.quantity}
                                fetchByCart={fetchByCart}
                              />
                              <Divider vertical />{" "}
                              <Button
                                onClick={() => setDeleteID(item.productId._id)}
                              >
                                <BsFillTrash3Fill />
                              </Button>{" "}
                              <Divider vertical />
                            </Col>
                          </Row>
                        </>
                      );
                    })}
                  </Col>
                </>
              )}

              {cartItem.length === 0 ? (
                <></>
              ) : (
                <>
                  <Col md={1} sm={0} xs={0}></Col>
                  <Col md={5} sm={24} xs={24} className="pricedetails">
                    <p>
                      <b>PRICE DETAILS</b>
                      <hr />
                    </p>
                    <div className="pricetag">
                      <p>Price</p> <p>{totalSum.totalTPrice}</p>
                    </div>
                    <div className="pricetag">
                      <p>Quantity</p> <p>{totalSum.totalQuantity}</p>
                    </div>
                    <div className="deliveryCharge">
                      <p>Delivery Charges</p>
                      <p>Free</p>
                    </div>
                    <hr />
                    <div className="totalAmount">
                      <p style={{ fontSize: 15 }}>
                        <b>Total Amount</b>
                      </p>
                      <p>{totalSum.totalTPrice}</p>
                    </div>
                    <Link to={`shopnow/${cartID}`}>
                      <Button
                        color="green"
                        appearance="primary"
                        style={{ marginTop: "20px" }}
                      >
                        PLACE ORDER
                      </Button>
                    </Link>
                  </Col>
                  <Col md={1}></Col>
                </>
              )}
            </Row>
          </Grid>

          <Footer />

          <AlertConfirm
            id={deleteId}
            toDeleteByID={toDeleteByID}
            open={open}
            setDeleteopen={setDeleteopen}
          />
        </>
      )}
    </>
  );
}
