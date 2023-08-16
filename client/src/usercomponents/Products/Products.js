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
import { LoaderDiv } from "../Home/LoaderDiv";
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
  const [productName, setProductName] = useState([]);
  const [isLoading, setLoading] = useState(true);
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
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
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
      {isLoading ? (
        <LoaderDiv />
      ) : (
        <>
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
                          className={
                            index === activeIndex ? "active" : "inactive"
                          }
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
              <Row className="">
                {productName.map((curtEle, index) => {
                  return (
                    <div key={index}>
                      <Col md={5} sm={24} xs={24}>
                        <NavLink
                          as={Link}
                          to={`/products/details/${curtEle._id}`}
                        >
                          <Panel
                            shaded
                            bordered
                            bodyFill
                            className="product_list"
                          >
                            <img
                              src={curtEle?.productImage[0]?.imageUrl}
                              height="240"
                              className="img_mob_pan"
                            />

                            <Panel>
                              <p className="product-thumb">{curtEle.title}</p>
                              <p className="priceTag">
                                <b>₹{curtEle.price}.00</b>
                              </p>
                              <p></p>
                              <Rate readOnly defaultValue={1} size="xs" />
                            </Panel>
                          </Panel>
                        </NavLink>
                      </Col>
                    </div>
                  );
                })}
              </Row>
            </Grid>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
