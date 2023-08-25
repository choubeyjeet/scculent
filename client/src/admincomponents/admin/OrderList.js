import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Grid,
  Row,
  Col,
  PanelGroup,
  SelectPicker,
  Placeholder,
  Panel,
  DatePicker,
  InputGroup,
  Input,
  Whisper,
  Tooltip,
  Table,
  Pagination,
  Loader,
} from "rsuite";

import SearchIcon from "@rsuite/icons/Search";
import {
  getOrderHistory,
  getOrderByDate,
} from "../features/orderHistory/orderHistoryThunk";
import DateFormat from "../../usercomponents/DateFormat/DateFormat";
import { Link } from "react-router-dom";

const { Column, HeaderCell, Cell } = Table;
export const OrderList = () => {
  const [productData, setData] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const [prev, setPrev] = React.useState(true);
  const [next, setNext] = React.useState(true);
  const [first, setFirst] = React.useState(true);
  const [last, setLast] = React.useState(true);
  const [ellipsis, setEllipsis] = React.useState(true);
  const [boundaryLinks, setBoundaryLinks] = React.useState(true);

  const [size, setSize] = React.useState("xs");
  const [maxButtons, setMaxButtons] = React.useState(5);
  const [total, setTotal] = React.useState(0);
  const [layout, setLayout] = React.useState([
    "total",
    "-",
    "limit",
    "|",
    "pager",
    "skip",
  ]);
  const [limit, setLimit] = React.useState(10);

  const orderdata = [
    "Order Placed",
    "Processing Stock",
    "Ready For Packing",
    "Ready To Delievr",
    "Delivery In Progress",
    "Delivered",
    "Received",
    "Returned",
    "Refunded",
    "Not Delivered",
  ].map((item) => ({
    label: item,
    value: item,
  }));

  const [activePage, setActivePage] = React.useState(1);

  const getOrderList = async (type) => {
    try {
      const response = await dispatch(
        getOrderHistory({ type, page: activePage, perPage: limit })
      );
      let { orders } = response.payload.data;
      setData(orders);
      setTotal(response.payload.data.count);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrderList("all");
  }, [activePage, limit]);

  const getOrderByDate = async (date) => {
    // try {
    //   console.log(date);
    //   const response = await dispatch(getOrderByDate(date));
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <>
      <Grid>
        <Row style={{ marginTop: "3%" }}>
          <Col md={24}>
            <Row>
              <Col md={14}>
                <Button
                  appearance="ghost"
                  onClick={() => {
                    getOrderList("all");
                  }}
                >
                  All
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <DatePicker
                  onChange={(e) => {
                    getOrderByDate(e);
                  }}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <SelectPicker
                  data={orderdata}
                  searchable={false}
                  style={{ width: 224 }}
                  placeholder="Select Status"
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Col>
              <Col md={10}>
                <InputGroup inside style={{ width: 300 }}>
                  <Input placeholder="Search By OrderID" />
                  <InputGroup.Button>
                    <SearchIcon />
                  </InputGroup.Button>
                </InputGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: "5%" }}>
          {isLoading ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              {" "}
              <Col md={24}>
                {" "}
                <Table autoHeight bordered cellBordered data={productData}>
                  <Column width={250} align="center" fixed resizable>
                    <HeaderCell>Order Id</HeaderCell>
                    <Cell dataKey="_id" />
                  </Column>
                  <Column width={200} align="center" resizable>
                    <HeaderCell>Order Date</HeaderCell>
                    {/*                   <DateFormat timestamp={items.createdAt} />
                     */}

                    <Cell>
                      {(productData) => (
                        <span>
                          <DateFormat timestamp={productData.createdAt} />
                        </span>
                      )}
                    </Cell>
                  </Column>
                  <Column width={150} resizable>
                    <HeaderCell>Name</HeaderCell>
                    <Cell>
                      {(productData) => (
                        <span>
                          {productData.userId.firstname}{" "}
                          {productData.userId.lastname}
                        </span>
                      )}
                    </Cell>
                  </Column>

                  <Column width={100} resizable>
                    <HeaderCell>Total Amount</HeaderCell>
                    <Cell dataKey="finalAmount" />
                  </Column>

                  <Column width={100} resizable>
                    <HeaderCell>Payment Status</HeaderCell>
                    <Cell
                      dataKey="paymentStatus"
                      style={{ textTransform: "capitalize" }}
                    />
                  </Column>
                  <Column width={200} resizable>
                    <HeaderCell>Address</HeaderCell>
                    <Cell>
                      {(productData) => (
                        <span>
                          <Whisper
                            placement="bottom"
                            controlId="control-id-hover"
                            trigger="hover"
                            speaker={
                              <Tooltip>
                                {productData?.shippingAddress?.address +
                                  productData?.shippingAddress?.landmark +
                                  ", " +
                                  productData?.shippingAddress?.city +
                                  ", " +
                                  productData?.shippingAddress?.state +
                                  ", " +
                                  productData?.shippingAddress?.country +
                                  ", " +
                                  productData?.shippingAddress?.pincode}
                              </Tooltip>
                            }
                          >
                            <span>{productData?.shippingAddress?.name}</span>
                          </Whisper>
                        </span>
                      )}
                    </Cell>
                  </Column>
                  <Column width={200} resizable>
                    <HeaderCell>Mobile Number</HeaderCell>
                    <Cell dataKey="shippingAddress.mobileNumber" />
                  </Column>

                  <Column width={200} resizable>
                    <HeaderCell>Status</HeaderCell>
                    <Cell
                      dataKey="status"
                      style={{ textTransform: "capitalize" }}
                    />
                  </Column>

                  <Column width={100} fixed="right">
                    <HeaderCell>...</HeaderCell>
                    <Cell>
                      {(productData) => (
                        <>
                          <Link to={`${productData._id}`}>
                            <span
                              className="addPointer"
                              title="View Order Details"
                            >
                              View
                            </span>
                          </Link>
                        </>
                      )}
                    </Cell>
                  </Column>
                </Table>
              </Col>
            </>
          )}
        </Row>
        <Row style={{ padding: 20 }}>
          <Col md={24}>
            <Pagination
              layout={layout}
              size={size}
              prev={prev}
              next={next}
              first={first}
              last={last}
              ellipsis={ellipsis}
              boundaryLinks={boundaryLinks}
              total={total}
              limit={limit}
              limitOptions={[10, 20, 30, 40, 50]}
              maxButtons={maxButtons}
              activePage={activePage}
              onChangePage={setActivePage}
              onChangeLimit={setLimit}
            />
          </Col>
        </Row>
      </Grid>
    </>
  );
};
