import React, { useEffect, useRef, useState } from "react";
import "./assets/css/productDetails.css";
import NavbarHead from "../Navbar/NavbarHead";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getProductWithID } from "../features/products/prooductListThunk";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Rate } from "rsuite";
import { addToCart } from "../features/carts/cartThunk";
import { LoaderDiv } from "../Home/LoaderDiv";
import { getCartItem } from "../features/carts/cartThunk";

const ProductDetails = () => {
  const [productData, setProductData] = useState([]);
  const [currentImage, setCurrentImage] = useState();
  let navigate = useNavigate();
  const [price, setPrice] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isExist, setExist] = useState(false);
  const dispatch = useDispatch();

  const { id } = useParams();
  const { user } = useSelector((state) => state.userSlice);
  const userId = user?._id;

  const fetchCartDetails = async () => {
    try {
      const response = await dispatch(
        getCartItem({ userId: userId, productId: id })
      );
      if (response.payload.status === 200) {
        setExist(true);
      } else {
        setExist(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const getProductWith = async () => {
      try {
        const product = await dispatch(getProductWithID(id));
        setProductData(product.payload.data);

        setCurrentImage(product.payload.data.productImage[0].imageUrl);
        setPrice(product.payload.data.price);
      } catch (err) {
        console.log(err);
      }
    };
    getProductWith();
  }, [id]);

  useEffect(() => {
    if (userId) {
      fetchCartDetails();
      setLoading(false);
    }
  }, [userId]);
  //addToCartHandler
  const addToCartHandler = async () => {
    setLoading(true);
    try {
      var productId = productData._id;

      const response = await dispatch(
        addToCart({
          productId,
          quantity: 1,
          price: price,
        })
      );
      let { data, status } = response.payload;
      setLoading(false);
      if (status === 200) {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarHead />
      {isLoading ? (
        <>
          {" "}
          <LoaderDiv />
        </>
      ) : (
        <>
          <div className="card-wrapper">
            <div className="card">
              <div className="product-imgs">
                <div className="img-display">
                  <div className="img-showcase">
                    <img src={currentImage} alt="Tree image" />
                  </div>
                </div>
                <div className="img-select">
                  {productData?.productImage?.map((ele) => {
                    return (
                      <>
                        <div className="img-item">
                          <img
                            onClick={() => {
                              setCurrentImage(ele.imageUrl);
                            }}
                            src={ele.imageUrl}
                            alt="Tree image"
                          />
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="product-content">
                <h2 className="product-title">{productData.title}</h2>

                <div className="product-rating">
                  <Rate readOnly defaultValue={4} size="xs" />
                </div>

                <div className="product-price">
                  {/* <p className="last-price">
                Old Price: <span>$257.00</span>
              </p> */}
                  <p className="new-price">
                    Price: <span>₹{productData.price}</span>
                  </p>
                </div>

                <div className="product-detail">
                  <h2>about this item: </h2>
                  <p>{productData.description}</p>

                  <ul>
                    <li>
                      Category: <span>{productData.category}</span>
                    </li>
                    <li>
                      Available: <span>{productData.quantity} in stock</span>
                    </li>
                    <li>
                      Category: <span>Shoes</span>
                    </li>
                    <li>
                      Shipping Area: <span>All over the world</span>
                    </li>
                    <li>
                      Shipping Fee: <span>Free</span>
                    </li>
                  </ul>
                </div>

                <div className="purchase-info">
                  {/* <input
                    type="number"
                    min="0"
                    defaultValue={1}
                    max="100"
                    step={1}
                  /> */}

                  {isExist ? (
                    <>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => {
                          navigate("/cart");
                        }}
                      >
                        Go to Cart <i className="fas fa-shopping-cart"></i>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="btn"
                        onClick={addToCartHandler}
                      >
                        Add to Cart <i className="fas fa-shopping-cart"></i>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default ProductDetails;
