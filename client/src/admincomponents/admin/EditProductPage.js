import React, { useEffect, useState, useRef } from "react";
import {
  Drawer,
  Button,
  Form,
  ButtonToolbar,
  Input,
  Uploader,
  InputNumber,
} from "rsuite";

import { useDispatch } from "react-redux";
import {
  deleteProductImageWithID,
  getProductWithID,
} from "../features/productList/productListThunk";

export const EditProductPage = (props) => {
  const { id, open, setOpen, formType } = props;
  const [error, setError] = useState("");
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    discount: "",
  });
  const [fetchedImage, setImageF] = useState([]);

  const [imageS, setImages] = useState([]);

  const setOpenD = () => {
    setOpen(!open);
  };

  const setImageBuffer = (e) => {
    if (e.length > 0 || fetchedImage.length > 0) {
      setError("");
    }
    var imageB = [];
    for (const img of e) {
      imageB.push(img.blobFile);
    }

    setImages(imageB);
  };

  const setValue = (e, name) => {
    if (name !== "category") {
      setFormValue({ ...formValue, [name]: e });
    } else {
      setFormValue({ ...formValue, [name]: e.target.value });
    }
  };

  const submitFormData = () => {
    if (imageS.length === 0) {
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
      }

      formType(formData, pId);
    }
  };

  const deleteImage = (imageId, productId) => {
    dispatch(deleteProductImageWithID({ imageId, productId }));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (id !== undefined) {
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

      getData();
    }
  }, [id]);

  return (
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

              <input
                list="plants"
                name="category"
                className="rs-input"
                value={formValue.category}
                required
                onChange={(e) => {
                  setValue(e, "category");
                }}
              />
              <datalist id="plants">
                <option value="Bonsai Plants" />
                <option value="Lucky Bamboo" />
                <option value="Jade Plants" />
                <option value="Money Plants" />
                <option value="Snake Plants" />
                <option value="Succulents Plants" />
                <option value="Syngonium Plants" />
                <option value="Rose Plants" />
                <option value="Terraium Plants" />
                <option value="Bonsai Plants" />
              </datalist>
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
  );
};
