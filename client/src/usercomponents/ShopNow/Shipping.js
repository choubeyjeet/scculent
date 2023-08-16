import React, { useEffect, useState } from "react";
import { Form, Button, RadioGroup, Radio } from "rsuite";
import "./asset/shopNow.css";

import { ToastContainer, toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { setAddressDataCart } from "../features/shopNow/shopSlice";
import { createAddress, getDataByPincode } from "../features/shopNow/shopThunk";
import { LoaderDiv } from "../Home/LoaderDiv";
import { NavLink } from "react-router-dom";
function Shipping({ addressData, addressIdGet, fetchAllAddress }) {
  const [showAddress, setAddress] = useState(false);

  const [isLoading, setLoading] = useState(true);

  let dispatch = useDispatch();

  const showAddAddress = () => {
    setAddress(true);
  };

  useEffect(() => {
    if (addressData.length > 0) {
      setLoading(false);
    }
  });
  const addressHandler = async (addressId) => {
    await dispatch(setAddressDataCart({ addressId }));
  };

  return (
    <>
      {isLoading ? (
        <>
          <LoaderDiv />
        </>
      ) : (
        <>
          <Form.Group controlId="radioList">
            <RadioGroup
              name="radioList"
              value={addressIdGet}
              onChange={(e) => addressHandler(e)}
            >
              {addressData?.length > 0 &&
                addressData.map((data, index) => {
                  return (
                    <Radio checked={true} key={data._id} value={data._id}>
                      <b>{data.name}</b>
                      <br />
                      <br />
                      <span>{`${data.address} ${data.city} ${data.state} ${data.country}`}</span>
                      <span> Phone no: {data.mobileNumber} </span>

                      <hr />
                    </Radio>
                  );
                })}
            </RadioGroup>
          </Form.Group>
          <p></p>
          <NavLink to={"/manageAddress/createAddress"}>
            + Add a new address
          </NavLink>
          {/* <Button appearance="link" onClick={showAddAddress}>
            + Add a new address
          </Button> */}
        </>
      )}

      <ToastContainer />
    </>
  );
}

export default React.memo(Shipping);
