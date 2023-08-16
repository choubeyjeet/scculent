import React from "react";
import Footer from "../Footer/Footer";
import NavbarHead from "../Navbar/NavbarHead";
import { Container, Content, Row, Col } from "rsuite";

export default function About() {
  return (
    <>
      <NavbarHead />
      <Container>
        <Content>
          <h1 class="trendingHead" style={{ marginTop: 20 }}>
            About Us
          </h1>
          <Row>
            <Col md={2} sm={0} xs={0}></Col>
            <Col md={9} sm={24} xs={24}>
              <img
                src="https://www.nurserytoday.co.in/wp-content/uploads/2022/05/nursery-1.jpg"
                style={{ width: "100%" }}
              />
            </Col>
            <Col md={1} sm={0} xs={0}></Col>
            <Col md={10} sm={24} xs={24}>
              <Row style={{ marginTop: 20 }}>
                <Col md={0} sm={1} xs={1}></Col>
                <Col md={24} sm={22} xs={22}>
                  <p>
                    We started our journey of growing and maintaining plants as
                    a hobbyist, later as the team grew Succulent Dhaba took
                    shape from 2012. We at Succulent Dhaba work with one main
                    goal to grow healthy plants for our valuable customers. Our
                    small team consists of some passionate people looking
                    forward to provide proper guidance to our customers and new
                    plant buyers.
                  </p>
                  <p>
                    We started with one small nursery and now have multiple
                    nurseries in Bhimtal, Chanfi, Naukuchiatal and in Haldwani.
                    At our workplaces our approach is to uplift and give support
                    to local community and empower Women and farmers through
                    providing employment, training or by providing agri
                    equipments. We grow with the support and feedback of our
                    valuable Customers. In future also we need your support to
                    fulfill your demands and our goals.
                  </p>
                </Col>
                <Col md={1} sm={1} xs={1}></Col>
              </Row>
            </Col>
            <Col md={2} sm={0} xs={0}></Col>
          </Row>
        </Content>
      </Container>
      <Footer />
    </>
  );
}
