import React, { useEffect, useState } from "react";
import { Button, Col, Row, Steps } from "rsuite";
import Shipping from "./Shipping";
import Payment from "./Payment";
import OrderDetails from "./OrderDetails";
import NavbarHead from "../Navbar/NavbarHead";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllAddress } from "../features/shopNow/shopThunk";
import "./asset/shopNow.css";

export default function ShopNow() {
  const [currentStep, setCurrentStep] = useState(0);
  let [addressData, setAddressData] = useState([]);
  const [totalSum, setTotalSum] = useState({});
  const { address } = useSelector((state) => state.shopSlice);
  const { user } = useSelector((state) => state.userSlice);
  let dispatch = useDispatch();
  const setStepIncrement = () => {
    if (address !== undefined) {
      setCurrentStep(1);
    } else {
      toast("Please select a Delivery Address");
    }
  };

  const backSteps = () => {
    setCurrentStep(currentStep - 1);
  };

  const fetchAllAddress = async () => {
    try {
      const response = await dispatch(getAllAddress({ userID: user._id }));
      console.log(response);
      let { address } = response.payload;
      setAddressData(address);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user._id !== undefined) {
      fetchAllAddress();
    }
  }, [user._id]);

  return (
    <div>
      <NavbarHead setTotalSum={setTotalSum} />
      <Row className="shopnowdiv">
        <Col md={2} sm={0} xs={0}></Col>
        <Col md={12} sm={24} xs={24}>
          <Row>
            <Col md={24}>
              {console.log("===>sad", totalSum)}
              <Steps current={currentStep}>
                <Steps.Item title="Delivery Address" />
                <Steps.Item title="Payment Details" />
                <Steps.Item title="Orders" />
              </Steps>
            </Col>
          </Row>
          <Row style={{ marginTop: "10%" }}>
            <Col md={24} sm={24}>
              {currentStep === 0 && (
                <Shipping
                  addressData={addressData}
                  fetchAllAddress={fetchAllAddress}
                  addressIdGet={address}
                />
              )}
              {currentStep === 1 && <Payment />}
              {currentStep === 2 && <OrderDetails />}
            </Col>
          </Row>

          <Row style={{ marginTop: "10%", textAlign: "center" }}>
            <Col md={24} sm={24}>
              {currentStep !== 0 && (
                <>
                  <Button
                    color="green"
                    appearance="primary"
                    onClick={backSteps}
                  >
                    Back
                  </Button>
                </>
              )}
              &nbsp;&nbsp;
              <Button
                color="green"
                appearance="primary"
                onClick={setStepIncrement}
              >
                Next
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md={1} sm={0} xs={0}></Col>

        <Col md={7} sm={24} xs={24} className="pricedetails">
          <p>
            <b>PRICE DETAILS</b>
            <hr />
          </p>
          <div className="pricetag">
            <p>Price</p> <p>{totalSum.totalTPrice}</p>
          </div>
          <div className="pricetag">
            <p>Quantity</p> <p>{totalSum.totalQuantity || 1}</p>
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
            {/* <p>{totalSum.totalTPrice || 22}</p> */}
          </div>
          {/* <Link to={`shopnow/${cartID}`}>
                      <Button
                        color="green"
                        appearance="primary"
                        style={{ marginTop: "20px" }}
                      >
                        PLACE ORDER
                      </Button>
                    </Link> */}
        </Col>
        <Col md={1}></Col>
      </Row>

      <Footer />
      <ToastContainer />
    </div>
  );
}
