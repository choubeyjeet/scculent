import { Row, Col, Container } from "rsuite";
import Footer from "../Footer/Footer";
import NavbarHead from "../Navbar/NavbarHead";
import svg from "./assets/image/404.svg";

const PageNotFound = () => {
  return (
    <>
      {" "}
      <NavbarHead />
      <Container>
        <Row>
          <Col md={1} sm={2} xs={2}></Col>
          <Col md={18} sm={20} xs={20}>
            <div>
              <div class="empty-cart">
                <img src={svg} alt="empty" />
              </div>
            </div>
          </Col>
          <Col md={1} sm={2} xs={2}></Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default PageNotFound;
