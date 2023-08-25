import React, { useState } from "react";

import { Grid, Row, Col, Input } from "rsuite";
import { AiFillHome } from "react-icons/ai";
import { BsStopwatch } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import "./asset/css/Contact.css";
import NavbarHead from "../Navbar/NavbarHead";
import Footer from "../Footer/Footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { LoaderDiv } from "../Home/LoaderDiv";

export default function Contact() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [isLoading, setLoading] = useState(false);
  const setFormValue = (fieldname, value) => {
    setUserData({ ...userData, [fieldname]: value });
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/contactus",
        userData
      );

      if (response.status === 200) {
        toast(response.data.message);
        setUserData({
          username: "",
          email: "",
          message: "",
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarHead />

      {isLoading ? (
        <>LoaderDiv</>
      ) : (
        <>
          <Grid fluid>
            <Row className="contact_googlemap">
              <Col md={2}></Col>
              <Col md={20}>
                <form onSubmit={formSubmit}>
                  <h3 className="ourlocationheading">Contact Us</h3>
                  <hr />
                  <Row>
                    <Col md={4} className="contactinput">
                      Name
                    </Col>
                    <Col md={20}>
                      <Input
                        placeholder="Name"
                        required
                        value={userData.username}
                        onChange={(e) => {
                          setFormValue("username", e);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="inputcontactus">
                    <Col md={4} className="contactinput">
                      Your email address
                    </Col>
                    <Col md={20}>
                      <Input
                        placeholder="Email"
                        type="email"
                        required
                        value={userData.email}
                        onChange={(e) => {
                          setFormValue("email", e);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="inputcontactus">
                    <Col md={4} className="contactinput">
                      Enquiry
                    </Col>
                    <Col md={20}>
                      <Input
                        as="textarea"
                        rows={3}
                        placeholder="Message"
                        required
                        onChange={(e) => {
                          setFormValue("message", e);
                        }}
                        value={userData.message}
                      />
                    </Col>
                  </Row>
                  <hr />

                  <center>
                    <button type="submit" className="subm_btn">
                      submit
                    </button>
                  </center>
                </form>
              </Col>
              <Col md={2}></Col>
            </Row>
            <Row className="show-grid ourlocationrow">
              <Col md={2} sm={0}></Col>
              <Col md={20} sm={24}>
                <h3 className="ourlocationheading">Our Location</h3>
                <div className="contact_div">
                  <Grid fluid>
                    <Row className="show-grid ">
                      <Col md={6}>
                        <Row className="locationadd">
                          <Col md={24}>
                            <h5>
                              <span className="homeiconcontact">
                                {<AiFillHome />}
                              </span>
                              Store Address
                            </h5>
                            <p className="contactpara">
                              Kailash Vatika Nursery, Siloti Pandey,
                              Naukuchiatal Nainital, Uttrakhand, 263139
                            </p>
                          </Col>
                        </Row>

                        <Row className="locationadd">
                          <Col md={24}>
                            <h5>
                              <span className="homeiconcontact">
                                {<BsStopwatch />}
                              </span>
                              Opening Time
                            </h5>
                            <p className="contactpara">
                              Monday To Sunday
                              <br /> 9:00AM to 7:00PM
                            </p>
                          </Col>
                        </Row>
                        <Row className="locationadd">
                          <Col md={24}>
                            <h5>
                              <span className="homeiconcontact">
                                {<FaComment />}
                              </span>
                              Phone
                            </h5>
                            <p className="contactpara">+91 9528502281</p>
                          </Col>
                        </Row>
                        <Row className="locationadd">
                          <Col md={24}>
                            <h5>
                              <span className="homeiconcontact">
                                {<AiFillHome />}
                              </span>
                              Email Address
                            </h5>
                            <p className="contactpara">
                              succulentdhaba@gmail.com
                            </p>
                          </Col>
                        </Row>
                      </Col>
                      <Col md={18} sm={24}>
                        <iframe
                          title="Map"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27858.716937269597!2d79.49755986622941!3d29.213563429889096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a09addbd0c86d1%3A0x6793e360cb3d930f!2sHaldwani%2C%20Uttarakhand%20263139!5e0!3m2!1sen!2sin!4v1691586659432!5m2!1sen!2sin"
                          style={{ border: 0, width: "100%", height: "80vh" }}
                          allowFullScreen="allowfullscreen"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </Col>
                    </Row>
                  </Grid>
                </div>
              </Col>
              <Col md={2}></Col>
            </Row>
          </Grid>
        </>
      )}

      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
