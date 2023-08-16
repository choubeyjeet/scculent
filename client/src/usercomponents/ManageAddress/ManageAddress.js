import React, { useEffect, useState } from "react";
import "./Manage.css";
import NavbarHead from "../Navbar/NavbarHead";
import Footer from "../Footer/Footer";
import { Container, Row, Col, Panel, ButtonToolbar, Button } from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  deleteAddressById,
  getAllAddress,
} from "../features/shopNow/shopThunk";
import { Link, NavLink } from "react-router-dom";
import { AlertConfirm } from "../Utils/alertConfirm";
import { LoaderDiv } from "../Home/LoaderDiv";

const ManageAddress = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userSlice);
  const [addAdressUserID, setAddressData] = useState([]);
  const [deleteId, setDeleteAddress] = useState("");
  const [open, setDeleteopen] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (user._id !== undefined) {
      getAllAddressA();
    }
  }, [user._id]);

  const getAllAddressA = async () => {
    try {
      const address = await dispatch(getAllAddress({ userID: user._id }));
      setAddressData(address.payload.address);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const setDeleteID = (id) => {
    setDeleteAddress(id);
    setDeleteopen(true);
  };

  const toDeleteByID = async () => {
    setLoading(true);
    try {
      const response = await dispatch(deleteAddressById(deleteId));
      setLoading(false);

      toast.success(response.payload.message);
      getAllAddressA();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoaderDiv />
      ) : (
        <>
          <NavbarHead />
          <Container style={{ marginTop: "5%" }}>
            <Row>
              <Col md={2} sm={2} xs={2}></Col>
              <Col md={20} sm={20} xs={20}>
                <Button
                  color="green"
                  to="/manageAddress/createAddress"
                  as={Link}
                  type="button"
                  appearance="primary"
                  style={{ marginTop: "2%" }}
                >
                  <PlusIcon />
                  &nbsp;&nbsp;Add Address
                </Button>
              </Col>
              <Col md={2} sm={2} xs={2}></Col>
            </Row>
            <Row style={{ marginTop: "5%" }}>
              <Col md={2} sm={0} xs={0}></Col>
              <Col md={18} sm={24} xs={24}>
                <Row>
                  {addAdressUserID.map((ele, index) => {
                    return (
                      <>
                        <Col md={0} sm={2} xs={2}></Col>
                        <Col
                          md={6}
                          sm={20}
                          xs={20}
                          key={index}
                          className="addpan"
                        >
                          <Panel
                            bordered
                            style={{ height: 300 }}
                            header={ele.name}
                          >
                            {ele.mobileNumber}
                            <br />
                            {ele.address}
                            <br />
                            {ele.city},{ele.pincode},{ele.state}
                            <br />
                            {ele.country}
                            <br />
                            {ele.landmark}
                            <br />
                            <br />
                            <ButtonToolbar
                              style={{ position: "absolute", bottom: 10 }}
                            >
                              <Button
                                appearance="default"
                                as={Link}
                                to={`${ele._id}`}
                              >
                                Edit
                              </Button>
                              <Button
                                color="green"
                                onClick={() => {
                                  setDeleteID(ele._id);
                                }}
                                appearance="primary"
                              >
                                Remove
                              </Button>
                            </ButtonToolbar>
                          </Panel>
                        </Col>
                        <Col md={0} sm={2} xs={2}></Col>
                      </>
                    );
                  })}
                </Row>
              </Col>

              <Col md={2} sm={0} xs={0}></Col>
            </Row>
            <Row>
              <Col md={24}>
                <Footer />
              </Col>
            </Row>
          </Container>
          <AlertConfirm
            id={deleteId}
            toDeleteByID={toDeleteByID}
            open={open}
            setDeleteopen={setDeleteopen}
          />

          <ToastContainer />
        </>
      )}
    </>
  );
};

export default ManageAddress;
