import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../features/products/prooductListThunk";
import {
  Carousel,
  Grid,
  Row,
  Col,
  Panel,
  Rate,
  Progress,
  ButtonToolbar,
  IconButton,
  Button,
} from "rsuite";

import image5 from "./asset/image/image5.jpg";
import image6 from "./asset/image/image6.jpg";
import image7 from "./asset/image/image7.jpg";
import image8 from "./asset/image/image8.jpg";

import video from "./asset/image/video.mp4";
import NavbarHead from "../Navbar/NavbarHead";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { LoaderDiv } from "./LoaderDiv";

import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineEye,
} from "react-icons/ai";
import { VscListSelection } from "react-icons/vsc";
import "./asset/css/Home.css";
export default function Home() {
  const [topSelling, setTopSelling] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await dispatch(
          getAllProducts({ type: "trending", category: "trending" })
        );
        setTopSelling(response.payload.totalProducts);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoaderDiv />
      ) : (
        <>
          <NavbarHead />
          <div id="master_site_wrapper">
            <main role="main">
              <div className="container-fluid no-padding">
                <section className="no-padding" id="destination-masthead">
                  <div id="masthead_wrapper" className="col-xs-12">
                    <div className="masthead-content-wrapper">
                      <div className="destinations-section-wrapper green">
                        <div className="masthead-content">
                          <div className="title-container">
                            <h2 className="title">Smile with green</h2>
                            <br />
                            <h5 className="subtitle">
                              Your to got store for succulent and cacti plants.
                              Delivered straight to your door.
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </main>
          </div>
          <div className="trendin_product">
            <h1 className="trendingHead">Trending Products</h1>
          </div>
          <Grid fluid>
            <Row>
              <Col md={2}></Col>

              {topSelling?.length > 0 &&
                topSelling?.map((trending, index) => {
                  return (
                    <div key={index}>
                      <Col md={5} sm={24} xs={24} data-aos="zoom-in">
                        <Panel
                          shaded
                          bordered
                          bodyFill
                          className="panel_div_mob"
                        >
                          <img
                            src={trending.productImage[0].imageUrl}
                            className="img_mob_pan"
                            alt="Product Image"
                          />
                          <Panel>
                            <p className="product-thumb">{trending.title}</p>
                            <p className="priceTag">
                              <b>₹{trending.price}</b>
                            </p>
                            <div style={{ marginTop: 10, marginBottom: 10 }}>
                              <Rate readOnly defaultValue={5} />
                            </div>
                            <p>
                              <Link to={`/products/details/${trending._id}`}>
                                <Button color="green" appearance="primary">
                                  Shop Now
                                </Button>
                              </Link>
                            </p>
                          </Panel>
                        </Panel>
                      </Col>
                    </div>
                  );
                })}
            </Row>
          </Grid>
          <div className="Our_Product">
            <h1 className="trendingHead">Our Product</h1>
            <Grid fluid>
              <Row className="show-grid">
                {/* <Col md={1}></Col> */}
                <Col md={8} sm={24} xs={24} data-aos="fade-up">
                  <div className="newPlant bonsai">
                    <div className="Nplant">
                      <h2>Bonsai Plant!</h2>

                      <Link to="/products/Bonsai Plants">
                        <Button color="green" appearance="primary">
                          Shop Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Col>
                <Col md={8} sm={24} xs={24} data-aos="fade-up">
                  <div className="newPlant snake">
                    <div className="Nplant">
                      <h2>Snake Plant!</h2>
                      <Link to="/products/Snake Plants">
                        {" "}
                        <Button color="green" appearance="primary">
                          Shop Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Col>
                <Col md={8} sm={24} xs={24} data-aos="fade-up">
                  <div className="newPlant cactus">
                    <div className="Nplant">
                      <h2>Cactus Plant!</h2>

                      <Link to="/products/Cactus Plants">
                        {" "}
                        <Button color="green" appearance="primary">
                          Shop Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Col>
                {/* <Col md={1}></Col> */}
              </Row>
              <Row className="show-grid">
                {/* <Col md={1}></Col> */}
                <Col md={8} sm={24} xs={24} data-aos="fade-up">
                  <div className="newPlant syngonium">
                    <div className="Nplant">
                      <h2>Syngonium Plants!</h2>

                      <Link to="/products/Syngonium Plants">
                        {" "}
                        <Button color="green" appearance="primary">
                          Shop Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Col>
                <Col md={8} sm={24} xs={24} data-aos="fade-up">
                  <div className="newPlant succulents">
                    <div className="Nplant">
                      <h2>Succulents Plants!</h2>

                      <Link to="/products/Succulents Plants">
                        {" "}
                        <Button color="green" appearance="primary">
                          Shop Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Col>
                <Col md={8} sm={24} xs={24} data-aos="fade-up">
                  <div className="newPlant jade">
                    <div className="Nplant">
                      <h2>Jade Plant!</h2>

                      <Link to="/products/Jade Plants">
                        <Button color="green" appearance="primary">
                          Shop Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Col>
                {/* <Col md={1}></Col> */}
              </Row>
            </Grid>
          </div>{" "}
          <Grid fluid style={{ marginTop: 100 }}>
            <Row className="parallaxvideopart">
              <Col md={24}>
                <div className="ParallaxVideo">
                  <div id="video-container">
                    <video autoPlay muted width="100%" loop>
                      <source src={video} type="video/mp4" />
                    </video>
                    <div className="top-left">
                      <div className="wrapper">
                        <div className="">
                          400 genera, 2000 species and more than 10,000
                          varieties of succulents for sale online only by
                          Succulent Dhaba
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Grid>
          <Grid fluid>
            <Row className="show-grid">
              <Col md={24}>
                <div className="container_div">
                  <Row>
                    <Col md={2}></Col>
                    <Col md={6} data-aos="flip-left">
                      <div className="testimonial-inner">
                        <div className="testimonial_image">
                          <img
                            alt=""
                            src="https://opencart.templatetrip.com/OPC07/OPC190_nursery/OPC01/image/catalog/demo/banners/user3.jpg"
                          />
                        </div>

                        <div className="testimonial-content">
                          <div className="testimonial_user_title">
                            <h4>John Duff</h4>
                            <div className="user_designation">
                              SEO and founder
                            </div>
                          </div>

                          <Rate readOnly defaultValue={5} allowHalf size="xs" />
                          <div className="testimonial_desc">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been
                              standard dummy text.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={1}></Col>
                    <Col md={6} data-aos="flip-left">
                      <div className="testimonial-inner">
                        <div className="testimonial_image">
                          <img
                            alt=""
                            src="https://opencart.templatetrip.com/OPC07/OPC190_nursery/OPC01/image/catalog/demo/banners/user1.jpg"
                          />
                        </div>
                        <div className="testimonial-content">
                          <div className="testimonial_user_title">
                            <h4>John Duff</h4>
                            <div className="user_designation">
                              SEO and founder
                            </div>
                          </div>
                          <Rate readOnly defaultValue={5} allowHalf size="xs" />
                          <div className="testimonial_desc">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been
                              standard dummy text.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={1}></Col>
                    <Col md={6}>
                      <div className="testimonial-inner" data-aos="flip-left">
                        <div className="testimonial_image">
                          <img
                            alt=""
                            src="https://opencart.templatetrip.com/OPC07/OPC190_nursery/OPC01/image/catalog/demo/banners/user2.jpg"
                          />
                        </div>
                        <div className="testimonial-content">
                          <div className="testimonial_user_title">
                            <h4>John Duff</h4>
                            <div className="user_designation">
                              SEO and founder
                            </div>
                          </div>
                          <Rate readOnly defaultValue={5} allowHalf size="xs" />
                          <div className="testimonial_desc">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been
                              standard dummy text.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={2}></Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Grid>
          <Footer />
        </>
      )}
    </>
  );
}
