import { useEffect, useState } from "react";
import { Grid, Row, Button, Col, Divider } from "rsuite";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

import NavbarHead from "../Navbar/NavbarHead";
import Footer from "../Footer/Footer";
import image7 from "../Home/asset/image/image7.jpg";
import "./asset/css/Cart.css";
import { useDispatch } from "react-redux";
import { fetchCart } from "../features/carts/cartThunk";
import { Counter } from "./Counter";
export default function Cart() {
  const [cartItem, setCartItem] = useState([]);
  let userId = localStorage.getItem("userid");

  let dispatch = useDispatch();

  useEffect(() => {
    const fetchByCart = async () => {
      try {
        const response = await dispatch(fetchCart(userId));
        setCartItem(response.payload.data.carts[0].items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchByCart();
  }, []);
  return (
    <>
      <NavbarHead />
      <br />
      <h3 style={{ textAlign: "center" }}>Shopping Cart</h3>
      <Grid fluid>
        <Row>
          <Col md={17}>
            {cartItem?.map((item, index) => {
              return (
                <>
                  <Row className="show-grid cartItems" key={item.productId._id}>
                    <Col md={2}></Col>
                    <Col md={5}>
                      <img
                        src={item.productId.productImage[0].imageUrl}
                        height="220"
                        style={{ width: 200 }}
                      />
                    </Col>
                    <Col md={1}></Col>
                    <Col md={15}>
                      <p style={{ fontSize: "24px" }}>{item.productId.title}</p>
                      <p>
                        <b style={{ fontSize: "24px" }}>
                          ₹{item.productId.price}
                        </b>
                      </p>
                      <Counter
                        productId={item.productId._id}
                        quantity={item.quantity}
                      />
                      <Divider vertical /> Delete <Divider vertical />
                    </Col>
                  </Row>
                </>
              );
            })}
          </Col>
          <Col md={1}></Col>
          <Col md={5} className="pricedetails">
            <p>
              <b>PRICE DETAILS</b>
              <hr />
            </p>
            <div className="pricetag">
              <p>Price</p> <p>1212</p>
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
              <p>212</p>
            </div>
            <Button
              color="green"
              appearance="primary"
              style={{ marginTop: "20px" }}
            >
              PLACE ORDER
            </Button>
          </Col>
          <Col md={1}></Col>
        </Row>
      </Grid>

      <Footer />
    </>
  );
}
