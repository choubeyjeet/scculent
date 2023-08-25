import React from "react";
import Footer from "../Footer/Footer";
import NavbarHead from "../Navbar/NavbarHead";
import { Container, Content, Row, Col, Grid } from "rsuite";

export default function About() {
  return (
    <>
      <NavbarHead />
      <Grid>
        <Container>
          <Content>
            <h1 className="trendingHead" style={{ marginTop: 20 }}>
              Policy
            </h1>
            <Row>
              <Col md={2} sm={0} xs={0}></Col>

              <Col md={20} sm={24} xs={24}>
                <Row>
                  <Col md={0} sm={1} xs={1}></Col>
                  <Col md={24} sm={22} xs={22}>
                    <p>
                      Ordering Process/ Policy Please go through the linked
                      YouTube video to make your ordering experience pleasant.
                      If you feel to connect with our team while ordering and
                      after sales plantcare please contact at emaild@gmail.com
                      or at our WhatsApp no. +91-9876767876.
                    </p>
                    <p>
                      {" "}
                      <br /> Shipping and Refund Policy All plants will be sent
                      bare-root with no-pots and no-soil. We ship through Speed
                      Post and our other courier partners. Approximate Transit
                      time: 3 to 7 Days. (Depending on the location) Note: We
                      will replace the plant if any plant get damaged during
                      transit. To initiate the refund process, we kindly request
                      you to record the unboxing video of the delivered plants
                      and share your complaint within 24 hrs of receiving the
                      courier.
                    </p>
                    <p>
                      <br /> Please note in certain situations plants are
                      non-refundable.
                      <br />
                      <br />
                      <ul>
                        <li>
                          Plants damaged due to improper care or neglence after
                          delivery.
                        </li>
                        <li>
                          Plants affected by extreme weather events or other
                          factors beyond our control.
                        </li>
                        <li>Plants in clearance sale.</li>
                      </ul>{" "}
                    </p>
                    <p>
                      <br />
                      If you have any query or require assistance with your
                      refund process, please contact our support team at
                      emailid@gmail.com or at our WhatsApp no. +91-9876767876.
                      We are here to ensure a smooth redressal of your
                      complaints. Refund process typically takes 1 - 3 working
                      days and after confirmation it will take max 3 days for
                      money to reflect in your bank account.
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col md={2} sm={0} xs={0}></Col>
            </Row>
          </Content>
        </Container>
      </Grid>
      <Footer />
    </>
  );
}
