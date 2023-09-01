import React, { useEffect, useState } from "react";
import { Panel, Placeholder, Row, Col, Container, Loader } from "rsuite";
import GlobalIcon from "@rsuite/icons/Global";
import PeoplesIcon from "@rsuite/icons/Peoples";
import GridIcon from "@rsuite/icons/Grid";
import BarChartIcon from "@rsuite/icons/BarChart";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { getAllProducts } from "../features/productList/productListThunk";

const Card = (props) => (
  <Panel {...props} bordered>
    <Placeholder.Paragraph />
  </Panel>
);

export const Dashboard = () => {
  const [year, setYear] = useState(null);
  const [totalUser, setTotalUser] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [month, setMonth] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(year, month);
  let dispatch = useDispatch();

  const getMonth = (e) => {
    setMonth(e);
  };

  const getYear = (e) => {
    setYear(e);
  };
  useEffect(() => {
    async function getUserDataList() {
      try {
        const response = await axiosInstance.get("/api/v1/fetchAllUser");
        let { count } = response.data;

        setTotalUser(count);

        const productData = await dispatch(getAllProducts({ type: "count" }));
        setTotalProducts(productData.payload.totalProducts);

        setLoading(false);
      } catch (err) {}
    }
    getUserDataList();
  }, []);

  return (
    <>
      {loading ? (
        <Loader center size="lg" content="" />
      ) : (
        <Container fluid="true">
          <Row className="marginTop">
            <Col md={4} className="showData">
              <div className="showDivInline">
                <GlobalIcon className="showIconSize" />
              </div>
              <div className="showDivInline">&nbsp;Total Sales</div>
              <div className="incReaseF">12090</div>
            </Col>
            <Col md={2}></Col>
            <Col md={4} className="showData">
              <div className="showDivInline">
                <BarChartIcon className="showIconSize" />
              </div>
              <div className="showDivInline">&nbsp;Total Revenue</div>
              <div className="incReaseF">₹12039</div>
            </Col>
            <Col md={2}></Col>
            <Col md={4} className="showData">
              <div className="showDivInline">
                <PeoplesIcon className="showIconSize" />
              </div>
              <div className="showDivInline">&nbsp;Total Users</div>
              <div className="incReaseF">{totalUser}</div>
            </Col>
            <Col md={2}></Col>
            <Col md={4} className="showData">
              <div className="showDivInline">
                <GridIcon className="showIconSize" />
              </div>
              <div className="showDivInline">&nbsp;Total Products</div>
              <div className="incReaseF">{totalProducts}</div>
            </Col>
          </Row>

          <Row className="marginTop">
            <Col md={6}>
              Select Month to see the Sale:
              <input
                type="month"
                name="start"
                min="2023-07"
                max="2030-07"
                className="rs-input"
                onChange={(e) => {
                  getMonth(e);
                }}
              />
            </Col>
            <Col md={12}></Col>
            <Col md={6}>
              Select Year to see the Sale:
              <select
                name="year"
                className="rs-input"
                onChange={(e) => {
                  getYear(e);
                }}
              >
                <option>2023</option>
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
                <option>2028</option>
                <option>2029</option>
                <option>2030</option>
              </select>
            </Col>
            <Col md={2}></Col>
            {/* <Col md={6}>Select View Type:
<select name="year" className="rs-input"
   onChange={(e)=>{getType(e)}}>

<option>General</option>
<option>Chart</option>
<option>Pie</option>
   </select>
</Col> */}
          </Row>
          <Row className="marginTop">
            <Col md={6} sm={12}>
              <Card header="Bonsai Plants" />
            </Col>
            <Col md={6} sm={12}>
              <Card header="Lucky Bamboo" />
            </Col>
            <Col md={6} sm={12}>
              <Card header="Jade Plants" />
            </Col>
            <Col md={6} sm={12}>
              <Card header="Snake Plants" />
            </Col>
          </Row>
          <Row className="marginTop">
            {" "}
            <Col md={6} sm={12}>
              <Card header="Succelents Plants" />
            </Col>
            <Col md={6} sm={12}>
              <Card header="Syngonium Plants" />
            </Col>
            <Col md={6} sm={12}>
              <Card header="Rose Plants" />
            </Col>
            <Col md={6} sm={12}>
              <Card header="Terraium Plants" />
            </Col>
          </Row>
          <Row className="marginTop">
            <Col md={6} sm={12}>
              <Card header="Bonsai Plants" />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
