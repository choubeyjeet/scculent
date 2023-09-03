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

import { LoaderDiv } from "../Home/LoaderDiv";

import NavbarHead from "../Navbar/NavbarHead";
import Footer from "../Footer/Footer";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../features/products/prooductListThunk";
import { getAllCategoryData } from "../../admincomponents/features/category/categoryProductsThunk";

export default function Products() {
  const [productName, setProductName] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const dispatch = useDispatch();
  const { id } = useParams();

  const getCategory = async () => {
    try {
      const response = await dispatch(getAllCategoryData());
      setItems(response.payload.data.data);
    } catch (err) {
      console.error(err);
    }
  };

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
    getCategory();
    getProducts();
  }, []);

  const handleItemClick = async (index, item) => {
    setLoading(true);
    setActiveIndex(index);
    try {
      const response = await dispatch(
        getAllProducts({ type: "category", category: item })
      );

      if (response.payload === undefined) {
        setProductName([]);
      } else {
        setProductName(response.payload.products);
      }
      setLoading(false);
    } catch (errors) {
      setLoading(false);
    }
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
                          onClick={() =>
                            handleItemClick(index, item.categoryName)
                          }
                        >
                          {item.categoryName}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </>

            <Grid fluid>
              <Row className="">
                <Col md={24}>
                  <div className="container-inline">
                    {productName.map((curtEle, index) => {
                      return (
                        <div className="items" key={index}>
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
                        </div>
                      );
                    })}
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
