import React, { useState, useEffect } from "react";
import NavbarHead from "../Navbar/NavbarHead";
import Footer from "../Footer/Footer";
import { Col, Container, Row } from "rsuite";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  fetchAddressById,
  getDataByPincode,
  updateAddressById,
} from "../features/shopNow/shopThunk";
import { LoaderDiv } from "../Home/LoaderDiv";
import { useNavigate, useParams } from "react-router-dom";

export const EditAddress = () => {
  let { id } = useParams();
  const [addressbyID, setZAddress] = useState({
    city: "",
    state: "",
    country: "",
    pincode: "",
    name: "",
    mobileNumber: "",
    landmark: "",
    address: "",
  });
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const getAddressDetail = async (pincode) => {
    setLoading(true);
    try {
      const userAddress = await dispatch(getDataByPincode(pincode));

      if (userAddress.payload !== undefined) {
        const { Block, State, Country, Pincode } = userAddress.payload;
        setZAddress({
          ...addressbyID,
          city: Block,
          state: State,
          country: Country,
          pincode: Pincode,
        });
      } else {
        setZAddress({
          ...addressbyID,
          city: "",
          state: "",
          country: "",
          pincode: "",
        });
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const fetchAddress = async () => {
    try {
      const response = await dispatch(fetchAddressById(id));
      let {
        name,
        landmark,
        mobileNumber,
        pincode,
        country,
        city,
        address,
        state,
      } = response.payload.data.address;

      setZAddress({
        ...addressbyID,
        name,
        landmark,
        pincode,
        city,
        address,
        state,
        mobileNumber,
        country,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAddress();
  }, []);
  let navigate = useNavigate();

  const updateAddressHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(updateAddressById({ id, addressbyID }));

      toast.success(response.payload.message);

      setTimeout(() => {
        navigate("/manageAddress");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoaderDiv />
      ) : (
        <>
          {console.log("Form Data", addressbyID)}
          <NavbarHead />
          <Container>
            <Row>
              <Col md={4} sm={0} xs={0}></Col>
              <Col md={16} sm={24} xs={24}>
                <form onSubmit={updateAddressHandler}>
                  <div className="container">
                    <h2>Edit Address</h2>
                    <p></p>
                    <hr />
                    <div className="form">
                      <div className="fields ">
                        <label className="field">
                          <span className="field__label" htmlFor="firstname">
                            Name (Enter firstname and lastname)
                          </span>
                          <input
                            required
                            className="field__input"
                            type="text"
                            name="name"
                            value={addressbyID.name}
                            onChange={(e) => {
                              setZAddress({
                                ...addressbyID,
                                name: e.target.value,
                              });
                            }}
                          />
                        </label>
                      </div>
                      <label className="field">
                        <span className="field__label" htmlFor="Mobile Number">
                          Mobile Number
                        </span>
                        <input
                          required
                          className="field__input"
                          type="text"
                          id="mobile"
                          value={addressbyID.mobileNumber}
                          onChange={(e) => {
                            setZAddress({
                              ...addressbyID,
                              mobileNumber: e.target.value,
                            });
                          }}
                        />
                      </label>
                      <label className="field">
                        <span className="field__label" htmlFor="address">
                          Address
                        </span>
                        <input
                          required
                          className="field__input"
                          type="text"
                          id="address"
                          value={addressbyID.address}
                          onChange={(e) => {
                            setZAddress({
                              ...addressbyID,
                              address: e.target.value,
                            });
                          }}
                        />
                      </label>
                      <label className="field">
                        <span className="field__label" htmlFor="Landmark">
                          Landmark
                        </span>
                        <input
                          required
                          className="field__input"
                          type="text"
                          id="landmark"
                          value={addressbyID.landmark}
                          onChange={(e) => {
                            setZAddress({
                              ...addressbyID,
                              landmark: e.target.value,
                            });
                          }}
                        />
                      </label>
                      <div className="fields fields--3">
                        <label className="field">
                          <span className="field__label" htmlFor="zipcode">
                            Zip code
                          </span>
                          <input
                            required
                            className="field__input"
                            type="text"
                            name="pincode"
                            value={addressbyID.pincode}
                            onChange={(e) => {
                              setZAddress({
                                ...addressbyID,
                                pincode: e.target.value,
                              });
                            }}
                            onBlur={(e) => {
                              getAddressDetail(e.target.value);
                            }}
                          />
                        </label>
                        <label className="field">
                          <span className="field__label" htmlFor="city">
                            City
                          </span>
                          <input
                            required
                            className="field__input"
                            type="text"
                            readOnly
                            value={addressbyID.city}
                          />
                        </label>
                        <label className="field">
                          <span className="field__label" htmlFor="state">
                            State
                          </span>
                          <input
                            required
                            className="field__input"
                            type="text"
                            value={addressbyID.state}
                            readOnly
                          />
                        </label>
                      </div>
                      <label className="field">
                        <span className="field__label" htmlFor="country">
                          Country
                        </span>
                        <input
                          required
                          className="field__input"
                          type="text"
                          id="city"
                          value={addressbyID.country}
                          readOnly
                        />
                      </label>
                    </div>
                    <hr />
                    <button className="button" type="submit">
                      Update Address
                    </button>
                  </div>
                </form>
              </Col>
              <Col md={4} sm={0} xs={0}></Col>
            </Row>
          </Container>
          <Footer />
          <ToastContainer />
        </>
      )}
    </>
  );
};
