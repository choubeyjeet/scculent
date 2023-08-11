import { Table, Row, Col, Grid, Button } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

const data = [
  {
    id: (
      <img
        src="https://m.media-amazon.com/images/I/518l1-IZ0zL._AC_UF1000,1000_QL80_.jpg"
        className="view_cardImg"
      />
    ),
    product_name: "Aspetur Autodit Autfugit",
    model: "Product 1",
    quntity: 1,
    unit_price: "$26.00",
    total: "$26.00",
  },
  {
    id: (
      <img
        src="https://m.media-amazon.com/images/I/518l1-IZ0zL._AC_UF1000,1000_QL80_.jpg"
        className="view_cardImg"
      />
    ),
    product_name: "Aspetur Autodit Autfugit",
    model: "Product 1",
    quntity: 1,
    unit_price: "$26.00",
    total: "$26.00",
  },
  {
    id: (
      <img
        src="https://m.media-amazon.com/images/I/518l1-IZ0zL._AC_UF1000,1000_QL80_.jpg"
        className="view_cardImg"
      />
    ),
    product_name: "Aspetur Autodit Autfugit ",
    model: "Product 1",
    quntity: 1,
    unit_price: "$26.00",
    total: "$26.00",
  },
];

export default function Viewcart() {
  return (
    <>
      <Table
        rowHeight={100}
        height={400}
        className="view_cartTable"
        data={data}
      >
        <Column width={200} colSpan={1} resizable className="view_card_col">
          <Cell style={{ fontSize: "16px" }}>Image</Cell>
          <Cell dataKey="id" />
        </Column>

        <Column width={200} resizable className="view_card_col">
          <Cell style={{ fontSize: "16px" }}>Product Name</Cell>
          <Cell dataKey="product_name" />
        </Column>
        <Column width={150} resizable className="view_card_col">
          <Cell style={{ fontSize: "16px" }}>Model</Cell>
          <Cell dataKey="model" />
        </Column>

        <Column width={150} resizable className="view_card_col">
          <Cell style={{ fontSize: "16px" }}>Quantity</Cell>
          <Cell dataKey="quntity" />
        </Column>

        <Column width={150} resizable colSpan={2} className="view_card_col">
          <Cell style={{ fontSize: "16px" }}>Unit Price</Cell>
          <Cell dataKey="unit_price" />
        </Column>
        <Column width={150} resizable className="view_card_col">
          <Cell style={{ fontSize: "16px" }}>Total</Cell>
          <Cell dataKey="total" />
        </Column>
      </Table>
      <Grid fluid>
        <Row className="show-grid price_table">
          <Col md={6}></Col>
          <Col md={12}>
            <Row>
              <Col md={12} className="total_price">
                Sub-Total:
              </Col>
              <Col md={12} className="total_price">
                $40.00
              </Col>
            </Row>
            <Row>
              <Col md={12} className="total_price">
                GST:
              </Col>
              <Col md={12} className="total_price">
                $4.00
              </Col>
            </Row>
            <Row>
              <Col md={12} className="total_price">
                Total:
              </Col>
              <Col md={12} className="total_price">
                $52.00
              </Col>
            </Row>
            <Button className="btn-default">Continue Shopping</Button>
          </Col>

          <Col md={6}></Col>
        </Row>
      </Grid>
    </>
  );
}
