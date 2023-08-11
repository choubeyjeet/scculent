import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Panel,
  Grid,
  ButtonToolbar,
  ButtonGroup,
  IconButton,
  Modal,
  Rate,
  Container,
} from "rsuite";
import "./asset/css/Products.css";
import image5 from "../Home/asset/image/image5.jpg";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineEye,
} from "react-icons/ai";
import { CgArrowsExchangeV } from "react-icons/cg";
import NavbarHead from "../Navbar/NavbarHead";
import Footer from "../Footer/Footer";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../features/products/prooductListThunk";

export default function Products() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [productName, setProductName] = useState([]);

  const items = [
    "Bonsai Plants",
    "Lucky Bamboo",
    "Jade Plants",
    "Money Plants",
  ];
  const [activeIndex, setActiveIndex] = useState(null);

  const dispatch = useDispatch();
  const { id } = useParams();

  const getProducts = async () => {
    try {
      if (id === undefined) {
        var response = await dispatch(
          getAllProducts({ type: "category", category: "Bonsai Plants" })
        );
      } else {
        var response = await dispatch(
          getAllProducts({ type: "category", category: id })
        );
      }

      setProductName(response.payload.products);
    } catch (err) {}
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleItemClick = async (index, item) => {
    setActiveIndex(index);
    try {
      const response = await dispatch(
        getAllProducts({ type: "category", category: item })
      );

      setProductName(response.payload.products);
    } catch (errors) {}
  };
  return (
    <>
      <NavbarHead />
      <div className="contener">
        <>
          <div className="trendin_product">
            <h1 className="trendingHead">{id}</h1>
            <div className="tab-box-heading">
              {id === undefined && (
                <ul className="nav nav-tabs">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className={index === activeIndex ? "active" : "inactive"}
                      onClick={() => handleItemClick(index, item)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>

        <Grid fluid>
          <Row className="justifyConta">
            {productName.map((curtEle) => {
              return (
                <>
                  <Col md={5} className="product_col_list">
                    <NavLink as={Link} to={`/products/details/${curtEle._id}`}>
                      <Panel shaded bordered bodyFill className="product_list">
                        <img
                          src={curtEle?.productImage[0]?.imageUrl}
                          height="240"
                          className="img_mob_pan"
                        />
                        {/* <ButtonToolbar className="productIcons">
                        <ButtonGroup>
                          <IconButton
                            size="lg"
                            icon={<AiOutlineShoppingCart className="icons" />}
                            className="icon_btn"
                          />
                          <IconButton
                            size="lg"
                            icon={<AiOutlineHeart />}
                            className="icon_btn"
                          />
                          <IconButton
                            size="lg"
                            icon={<CgArrowsExchangeV />}
                            className="icon_btn"
                          />
                          <IconButton
                            size="lg"
                            icon={<AiOutlineEye />}
                            className="icon_btn"
                            onClick={handleOpen}
                          />
                        </ButtonGroup>
                      </ButtonToolbar> */}
                        <Panel>
                          <p className="product-thumb">{curtEle.title}</p>
                          <p className="priceTag">
                            <b>₹{curtEle.price}.00</b>
                          </p>
                          <p>
                            <Rate readOnly defaultValue={1} size="xs" />
                          </p>
                        </Panel>
                      </Panel>
                    </NavLink>
                  </Col>
                </>
              );
            })}
          </Row>
        </Grid>
        <Modal open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Row style={{ marginTop: "5%" }}>
            <Col md={8}>
              <img src={image5} height="240" style={{ width: 240 }} />
            </Col>
            <Col md={3}></Col>
            <Col md={13}>
              <h5 className="product_name">Hello</h5>

              <Row>
                <Col md={12} className="about_product">
                  Brand:
                </Col>
                <Col md={12} className="about_product">
                  Apple
                </Col>
              </Row>
              <Row>
                <Col md={12} className="about_product">
                  Product Code:
                </Col>
                <Col md={12} className="about_product">
                  Product 15
                </Col>
              </Row>
              <Row>
                <Col md={12} className="about_product">
                  Reward Points:
                </Col>
                <Col md={12} className="about_product">
                  100
                </Col>
              </Row>
              <Row>
                <Col md={12} className="about_product">
                  Availability:
                </Col>
                <Col md={12} className="about_product">
                  In Stock
                </Col>
              </Row>
              <hr />

              <p>
                <b>$119.00</b>
              </p>
            </Col>
          </Row>
        </Modal>
      </div>
      <Footer />
    </>
  );
}
