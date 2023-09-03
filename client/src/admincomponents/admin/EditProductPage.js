import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  Form,
  ButtonToolbar,
  Input,
  Uploader,
  InputNumber,
  CheckPicker,
} from "rsuite";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  deleteProductImageWithID,
  getProductWithID,
} from "../features/productList/productListThunk";
import { getAllCategoryData } from "../features/category/categoryProductsThunk";
import { LoaderDiv } from "../../usercomponents/Home/LoaderDiv";

export const EditProductPage = (props) => {
  const { id, open, setOpen, formType } = props;
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    discount: "",
  });
  const [fetchedImage, setImageF] = useState([]);

  const [imageS, setImages] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryError, setCategoryError] = useState(false);
  const [imageNum, setimageNum] = useState(false);
  const [showMe, showMeCheck] = useState(false);

  const setOpenD = () => {
    setOpen(!open);
    setImages([]);
  };

  const setImageBuffer = (e) => {
    if (e.length > 0 || fetchedImage.length > 0) {
      setError("");
    }

    const totalImage = fetchedImage.length + e.length;

    if (totalImage > 5) {
      setimageNum(true);
    } else {
      setimageNum(false);
    }

    var imageB = [];
    for (const img of e) {
      imageB.push(img.blobFile);
    }

    setImages(imageB);
  };

  const setValue = (e, name) => {
    if (name === "category" && e.length === 0) {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }
    setFormValue({ ...formValue, [name]: e });
  };

  const submitFormData = () => {
    const totalImage = fetchedImage.length + imageS.length;

    if (totalImage > 5) {
      setimageNum(true);
      return false;
    } else {
      setimageNum(false);
    }

    if (formValue.category.length === 0) {
      setCategoryError(true);
      return false;
    }

    if (totalImage === 0) {
      setError("Please select a file.");
      return false;
    } else {
      setError("");

      let formData = new FormData();

      Array.from(imageS).forEach((image) => {
        formData.append("productImage", image);
      });

      const { title, category, description, price, quantity, discount } =
        formValue;
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("discount", discount);

      if (id !== undefined) {
        var pId = id;
        setIsLoading(true);
        setOpenD();

        formType(formData, pId);
      }

      setIsLoading(false);
    }
  };

  const deleteImage = async (imageId, productId) => {
    try {
      setIsLoading(true);
      const totalImage = fetchedImage.length;
      if (totalImage === 1) {
        toast.error("Image cannot be deleted. There should be one image.");
        setIsLoading(false);
      } else {
        setOpenD();
        const response = await dispatch(
          deleteProductImageWithID({ imageId, productId })
        );

        toast.success("Image deleted successfully.");
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("Image cannot be deleted.");
      console.error(err);
    }
  };

  const dispatch = useDispatch();

  const getData = async () => {
    const data = await dispatch(getProductWithID(id));

    let { title, category, price, discount, quantity, description } =
      data?.payload.data;

    setImageF(data.payload.data.productImage);
    setFormValue({
      title,
      category,
      price,
      discount,
      quantity,
      description,
    });
  };

  useEffect(() => {
    if (id !== undefined) {
      setCategoryError(false);
      setimageNum(false);
      setImages([]);

      getData();
      showMeCheck(false);
    } else {
      setCategoryError(false);
      setimageNum(false);
      showMeCheck(true);
    }
  }, [open]);

  useEffect(() => {
    setCategoryError(false);
    setimageNum(false);
    const getCategory = async () => {
      try {
        const response = await dispatch(getAllCategoryData());
        const data = response.payload.data.data;
        var categoryData = data.map((item) => ({
          label: item.categoryName,
          value: item.categoryName,
        }));
        setCategory(categoryData);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    getCategory();
  }, [open]);

  return (
    <>
      {isLoading ? (
        <LoaderDiv />
      ) : (
        <>
          <Drawer open={open} onClose={setOpenD}>
            <Drawer.Header>
              <Drawer.Title>Product Details: {formValue.title} </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Form
                fluid={true}
                encType="multipart/form-data"
                onSubmit={submitFormData}
              >
                <Form.Group controlId="name-1">
                  <Form.ControlLabel>Product Name*</Form.ControlLabel>
                  <Form.Control
                    name="title"
                    placeholder="Product Name"
                    value={formValue.title}
                    onChange={(e) => {
                      setValue(e, "title");
                    }}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password-1">
                  <Form.ControlLabel>Category*</Form.ControlLabel>

                  {showMe ? (
                    <>
                      <CheckPicker
                        data={category}
                        style={{ width: "450px" }}
                        onChange={(e) => {
                          setValue(e, "category");
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <CheckPicker
                        data={category}
                        style={{ width: "450px" }}
                        onChange={(e) => {
                          setValue(e, "category");
                        }}
                        value={formValue?.category}
                      />
                    </>
                  )}

                  {categoryError && (
                    <Form.HelpText style={{ color: "red" }}>
                      Please select a category.
                    </Form.HelpText>
                  )}
                </Form.Group>
                <Form.Group controlId="textarea-1">
                  <Form.ControlLabel>Product Description*</Form.ControlLabel>
                  <Input
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formValue.description}
                    placeholder="Product Description"
                    onChange={(e) => {
                      setValue(e, "description");
                    }}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.ControlLabel>Product Price*</Form.ControlLabel>
                  <Form.Control
                    name="price"
                    value={formValue.price}
                    placeholder="Product Price"
                    onChange={(e) => {
                      setValue(e, "price");
                    }}
                    accepter={InputNumber}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.ControlLabel>Quantity*</Form.ControlLabel>
                  <Form.Control
                    name="quantity"
                    value={formValue.quantity}
                    placeholder="Quantity"
                    onChange={(e) => {
                      setValue(e, "quantity");
                    }}
                    accepter={InputNumber}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.ControlLabel>Discount(if applicable)</Form.ControlLabel>
                  <Form.Control
                    name="discount"
                    value={formValue.discount}
                    accepter={InputNumber}
                    placeholder="Discount"
                    onChange={(e) => {
                      setValue(e, "discount");
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Group>
                    <Uploader
                      style={{ cursor: "pointer" }}
                      action="/"
                      autoUpload={false}
                      onChange={(e) => {
                        setImageBuffer(e);
                      }}
                      draggable
                      accept="image/*"
                      required
                      multiple
                      maxPreviewFileSize={1024}
                    >
                      <div
                        style={{
                          height: 200,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span>Click or Drag files to this area to upload</span>
                      </div>
                    </Uploader>
                    {error && (
                      <Form.HelpText style={{ color: "red" }}>
                        Please select a file.
                      </Form.HelpText>
                    )}

                    {imageNum && (
                      <Form.HelpText style={{ color: "red" }}>
                        You cannot select more than 5 images.
                      </Form.HelpText>
                    )}
                    <div>
                      {fetchedImage.map((val, index) => {
                        return (
                          <div className="productItem" key={index}>
                            <img
                              style={{ width: 200, margin: 10 }}
                              className="productImage"
                              src={val.imageUrl}
                              alt="Product Image"
                            />
                            <span
                              className="deleteButton"
                              onClick={() => {
                                deleteImage(val.public_id, id);
                              }}
                            >
                              X
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </Form.Group>

                  <ButtonToolbar>
                    <Button appearance="primary" type="submit">
                      Submit
                    </Button>
                    <Button appearance="default" onClick={setOpenD}>
                      Cancel
                    </Button>
                  </ButtonToolbar>
                </Form.Group>
              </Form>
            </Drawer.Body>
          </Drawer>
        </>
      )}

      <ToastContainer />
    </>
  );
};
