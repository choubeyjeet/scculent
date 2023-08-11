import {
  Table,
  Pagination,
  Button,
  Row,
  Col,
  InputGroup,
  Input,
  Loader,
} from "rsuite";
import React, { useEffect, useState } from "react";
import { EditProductPage } from "./EditProductPage";
import TrashIcon from "@rsuite/icons/Trash";
import EditIcon from "@rsuite/icons/Edit";
import { AlertConfirm } from "../utility/AlertConfirm";
import AddOutlineIcon from "@rsuite/icons/AddOutline";
import SearchIcon from "@rsuite/icons/Search";
import "./assets/css/admin.css";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createProduct,
  deleteProductWithID,
  getProductWithID,
  updateTheProduct,
  getAllProducts,
} from "../features/productList/productListThunk";
import { axiosInstance } from "../../config/axiosInstance";

const { Column, HeaderCell, Cell } = Table;
export const ProductsTable = () => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [productID, setProductID] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openD, setDeleteopen] = React.useState(false);
  const [formType, setFormType] = React.useState("");

  const [productData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const deleteProductEdit = (id) => {
    setDeleteopen(!openD);
    setProductID(id);
  };

  const deleteByID = async (id) => {
    try {
      var data = await dispatch(deleteProductWithID({ id }));
      toast(data.payload.data.message);
      const response = await dispatch(getAllProducts({ type: "all" }));

      setData(response.payload.products);
    } catch (err) {
      toast(err);
    }
  };

  const AddNewProduct = () => {
    setFormType("newProduct");
    setOpen(!open);
  };

  const OpenProductEdit = (id) => {
    setOpen(!open);

    setProductID(id);
    setFormType("updateProduct");
  };

  const createNewProduct = async (formValue) => {
    try {
      const response = await dispatch(createProduct(formValue));

      toast(response.payload.data.message);
      const data = await dispatch(getAllProducts({ type: "all" }));

      setData(data.payload.products);
      setOpen(!open);
    } catch (err) {
      toast(err);
      setOpen(!open);
    }
  };

  const updateProduct = async (formValue, id) => {
    try {
      const response = await dispatch(updateTheProduct({ formValue, id }));

      toast(response.payload.data.message);
      const data = await dispatch(getAllProducts({ type: "all" }));

      setData(data.payload.products);
      setOpen(!open);
    } catch (err) {
      toast(err);
      setOpen(!open);
    }
  };

  const fetchProduct = async (value) => {
    try {
      const response = await dispatch(
        getAllProducts({ type: "search", search: value })
      );

      if (value == "") {
        const response = await dispatch(getAllProducts({ type: "all" }));
      }

      setData(response.payload.products);
      setLoading(false);
    } catch (err) {}
  };

  var data = productData.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await dispatch(getAllProducts({ type: "all" }));

        setData(response.payload.products);
        setLoading(false);
      } catch (err) {}
    };
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader center size="lg" content="" />
      ) : (
        <div style={{ marginTop: 50 }}>
          <Row style={{ marginBottom: 15 }}>
            <Col md={10}></Col>
            <Col md={10}>
              <InputGroup>
                <Input
                  placeholder="Search Products"
                  onChange={(value) => {
                    fetchProduct(value);
                  }}
                />
                <InputGroup.Button style={{ width: 70 }}>
                  <SearchIcon />
                </InputGroup.Button>
              </InputGroup>
            </Col>
            <Col md={4}>
              <Button appearance="primary" onClick={AddNewProduct}>
                <AddOutlineIcon /> &nbsp;&nbsp;Add New Product
              </Button>
            </Col>
          </Row>
          <Table autoHeight bordered cellBordered data={data}>
            <Column width={100} align="center" fixed>
              <HeaderCell></HeaderCell>
              <Cell style={{ padding: 0 }}>
                {(data) => (
                  <>
                    {data.productImage[0] !== undefined && (
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          background: "#f5f5f5",
                          borderRadius: 6,
                          marginTop: 2,
                          overflow: "",
                          display: "inline-block",
                        }}
                      >
                        <img
                          src={data.productImage[0].imageUrl}
                          alt={data._id}
                        />
                      </div>
                    )}
                  </>
                )}
              </Cell>
            </Column>
            <Column width={300} align="center" fixed resizable>
              <HeaderCell>Title</HeaderCell>
              <Cell dataKey="title" />
            </Column>

            <Column width={200} resizable>
              <HeaderCell>Description</HeaderCell>
              <Cell dataKey="description" />
            </Column>

            <Column width={100} resizable>
              <HeaderCell>Category</HeaderCell>
              <Cell dataKey="category" />
            </Column>

            <Column width={200} resizable>
              <HeaderCell>Price INR</HeaderCell>
              <Cell dataKey="price" />
            </Column>
            <Column width={200} resizable>
              <HeaderCell>Discount</HeaderCell>
              <Cell dataKey="discount" />
            </Column>

            <Column width={100} fixed="right">
              <HeaderCell>...</HeaderCell>
              <Cell>
                {(data) => (
                  <>
                    <EditIcon
                      className="addPointer"
                      onClick={() => {
                        OpenProductEdit(data._id);
                      }}
                      title="Edit Item"
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <TrashIcon
                      className="addPointer"
                      onClick={() => {
                        deleteProductEdit(data._id);
                      }}
                      title="Delete Item"
                    />
                  </>
                )}
              </Cell>
            </Column>
          </Table>
          <div style={{ padding: 20 }}>
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              maxButtons={5}
              size="xs"
              layout={["total", "-", "limit", "|", "pager", "skip"]}
              total={productData.length}
              limitOptions={[10, 30, 50]}
              limit={limit}
              activePage={page}
              onChangePage={setPage}
              onChangeLimit={handleChangeLimit}
              className="tableProductPagination"
            />
          </div>

          {formType === "newProduct" && (
            <EditProductPage
              open={open}
              setOpen={setOpen}
              formType={createNewProduct}
            />
          )}
          {formType === "updateProduct" && (
            <EditProductPage
              id={productID}
              open={open}
              setOpen={setOpen}
              formType={updateProduct}
            />
          )}
          <AlertConfirm
            open={openD}
            setDeleteopen={setDeleteopen}
            id={productID}
            toDeleteByID={deleteByID}
          />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      )}
    </>
  );
};
