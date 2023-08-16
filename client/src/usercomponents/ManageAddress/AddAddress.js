import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAddress, getDataByPincode } from "../features/shopNow/shopThunk";
import { toast } from "react-toastify";
import { setAddressDataCart } from "../features/shopNow/shopSlice";
import { useNavigate } from "react-router-dom";
import NavbarHead from "../Navbar/NavbarHead";
import Footer from "../Footer/Footer";
import { LoaderDiv } from "../Home/LoaderDiv";
const AddAddress = () => {
  let dispatch = useDispatch();
  const [showAddress, setAddress] = useState(false);

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
  let navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await dispatch(createAddress({ addressbyID }));
      setLoading(false);

      toast.success(response.payload.message);
      navigate("/manageAddress");
      //   fetchAllAddress();
    } catch (error) {
      setLoading(false);
      console.error(error);
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
          {" "}
          <NavbarHead />
          <div className="container">
            <h2>Shipping</h2>
            <p>Please enter your shipping details.</p>
            <hr />
            <form className="form" onSubmit={submitHandler}>
              <div className="fields ">
                <label className="field">
                  <span className="field__label" for="firstname">
                    Name (Enter firstname and lastname)
                  </span>
                  <input
                    className="field__input"
                    type="text"
                    name="name"
                    value={addressbyID.name}
                    onChange={(e) =>
                      setZAddress({
                        ...addressbyID,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </label>
              </div>
              <label className="field">
                <span className="field__label" for="Mobile Number">
                  Mobile Number
                </span>
                <input
                  className="field__input"
                  type="text"
                  id="mobile"
                  value={addressbyID.mobileNumber}
                  onChange={(e) =>
                    setZAddress({
                      ...addressbyID,
                      mobileNumber: e.target.value,
                    })
                  }
                  required
                />
              </label>
              <label className="field">
                <span className="field__label" for="address">
                  Address
                </span>
                <input
                  className="field__input"
                  type="text"
                  id="address"
                  onChange={(e) =>
                    setZAddress({
                      ...addressbyID,
                      address: e.target.value,
                    })
                  }
                  value={addressbyID.address}
                  required
                />
              </label>
              <label className="field">
                <span className="field__label" for="Landmark">
                  Landmark
                </span>
                <input
                  className="field__input"
                  type="text"
                  id="landmark"
                  onChange={(e) =>
                    setZAddress({
                      ...addressbyID,
                      landmark: e.target.value,
                    })
                  }
                  value={addressbyID.landmark}
                  required
                />
              </label>
              <div className="fields fields--3">
                <label className="field">
                  <span className="field__label" for="zipcode">
                    Zip code
                  </span>
                  <input
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
                    required
                  />
                </label>
                <label className="field">
                  <span className="field__label" for="city">
                    City
                  </span>
                  <input
                    className="field__input"
                    type="text"
                    readOnly
                    value={addressbyID.city}
                  />
                </label>
                <label className="field">
                  <span className="field__label" for="state">
                    State
                  </span>
                  <input
                    className="field__input"
                    type="text"
                    value={addressbyID.state}
                    readOnly
                  />
                </label>
              </div>
              <label className="field">
                <span className="field__label" for="country">
                  Country
                </span>
                <input
                  className="field__input"
                  type="text"
                  id="city"
                  value={addressbyID.country}
                  readOnly
                />
              </label>
              <button color="green" className="button" type="submit">
                Continue
              </button>
            </form>
            <hr />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default AddAddress;
