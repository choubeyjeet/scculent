import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { LoaderDiv } from "../../usercomponents/Home/LoaderDiv";
import {
  Row,
  Col,
  Button,
  Grid,
  Panel,
  Form,
  Input,
  Modal,
  Uploader,
} from "rsuite";
import {
  createCategory,
  getAllCategoryData,
  deleteCategoryById,
} from "../features/category/categoryProductsThunk";
import { AlertConfirm } from "../utility/AlertConfirm";

export const ManageCategory = () => {
  const [open, setOpen] = React.useState(false);
  const [imageS, setImages] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [formValue, setFormValue] = useState({
    categoryName: "",
  });
  const [dataCategory, setDataCategory] = useState([]);
  const [openD, setDeleteopen] = React.useState(false);
  const [categoryID, setcategoryID] = React.useState("");
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const submitFormData = async () => {
    handleClose();
    setIsLoading(true);
    if (imageS.length === 0) {
      setError("Please select a file.");
      return false;
    } else {
      setError("");
      var formData = new FormData();
      Array.from(imageS).forEach((image) => {
        formData.append("productImage", image);
      });

      formData.append("categoryName", formValue.categoryName);
    }
    try {
      const response = await dispatch(createCategory(formData));

      setIsLoading(false);
      toast(response.payload.data.message);
      getCategory();
    } catch (err) {
      handleClose();
      setIsLoading(false);
      console.error(err);
    }
  };
  const setImageBuffer = (e) => {
    if (e.length > 0) {
      setError("");
    }
    var imageB = [];
    for (const img of e) {
      imageB.push(img.blobFile);
    }

    setImages(imageB);
  };

  const getCategory = async () => {
    try {
      const response = await dispatch(getAllCategoryData());

      setDataCategory(response.payload.data);
    } catch (err) {
      toast("Error in getting categories.");
    }
  };

  useEffect(() => {
    setIsLoading(false);
    getCategory();
  }, []);

  const deleteByID = async (id) => {
    try {
      setIsLoading(true);
      const response = await dispatch(deleteCategoryById({ id: id }));
      setIsLoading(false);
      toast.success(response.payload.data.message);
      getCategory();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProductEdit = (id) => {
    setDeleteopen(!openD);
    setcategoryID(id);
  };

  return (
    <>
      {isLoading ? (
        <>
          <LoaderDiv />
        </>
      ) : (
        <>
          <Grid>
            <Row style={{ marginTop: "3%", textAlign: "right" }}>
              <Col md={24}>
                <Button appearance="primary" onClick={handleOpen}>
                  Add New Category
                </Button>
              </Col>
            </Row>
            <Row>
              <Col md={24}>
                <div className="inline-display-box">
                  {dataCategory?.data?.map((items, index) => {
                    return (
                      <div key={index}>
                        <div className="item">
                          <Panel
                            shaded
                            bordered
                            bodyFill
                            style={{ display: "inline-block", width: 240 }}
                          >
                            <img
                              src={`${items.productImage[0].imageUrl}`}
                              height="240"
                            />
                            <Panel header={items.categoryName}></Panel>
                            <div style={{ textAlign: "center", margin: 10 }}>
                              <Button
                                appearance="primary"
                                onClick={() => {
                                  deleteProductEdit(items._id);
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </Panel>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </Grid>
        </>
      )}

      <Modal open={open} size="xs">
        <Modal.Header>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Form encType="multipart/form-data" onSubmit={submitFormData}>
          <Modal.Body>
            <Form.Group controlId="name-9">
              <Form.ControlLabel>Category Name</Form.ControlLabel>
              <Form.Control
                name="CategoryName"
                required
                onChange={(e) => setFormValue({ categoryName: e })}
              />
            </Form.Group>

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
          </Modal.Body>
          <Modal.Footer>
            <Button appearance="primary" type="submit">
              Create
            </Button>
            <Button appearance="subtle" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <ToastContainer />
      <AlertConfirm
        open={openD}
        setDeleteopen={setDeleteopen}
        id={categoryID}
        toDeleteByID={deleteByID}
      />
    </>
  );
};
