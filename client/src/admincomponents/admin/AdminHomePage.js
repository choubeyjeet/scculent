import { AdminHomePageSideNav } from "./AdminHomePageSideNav";
import {
  Container,
  Header,
  Nav,
  Content,
  Sidebar,
  Badge,
  Popover,
  Whisper,
} from "rsuite";

import { ProductsTable } from "./ProductsTable";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { Inbox } from "./Inbox/Inbox";
import { AllUserList } from "./UserInfo/AllUserList";
import EllipsisHIcon from "@rsuite/icons/legacy/EllipsisH";
import NoticeIcon from "@rsuite/icons/Notice";
import { useState } from "react";
import { OrderList } from "./OrderList";
import { OrderDetails } from "./OrderDetails";
import { ManageCategory } from "./ManageCategory";

export const AdminHomePage = () => {
  const [heading, setHeading] = useState("Dashboard");

  return (
    <>
      <Container>
        <Sidebar>
          <AdminHomePageSideNav setHeading={setHeading} />
        </Sidebar>
        <Container>
          <Header className="navHeaderAdmin">
            <div
              className="showDivInline"
              style={{ float: "left", fontSize: 30 }}
            >
              {heading}
            </div>

            <div className="showDivInline">
              <Nav>
                <Nav.Item className="notificationB">
                  <Whisper
                    placement="bottom"
                    trigger="active"
                    controlId="control-id-active"
                    speaker={
                      <Popover title="Notifications">
                        <p>
                          This is a default Popover This is a default Popover
                        </p>
                        <p>Content Content</p>
                        <p></p>
                      </Popover>
                    }
                  >
                    <button className="notificationB">
                      {" "}
                      <NoticeIcon style={{ fontSize: "25px" }} />
                      <Badge content="5 NEW" />
                    </button>
                  </Whisper>
                </Nav.Item>

                <Nav.Menu icon={<EllipsisHIcon />} title="more...">
                  <Nav.Item>Setting</Nav.Item>
                  <Nav.Item>Logout</Nav.Item>
                </Nav.Menu>
              </Nav>
            </div>
          </Header>
          <Content>
            <Routes>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="users" element={<AllUserList />}></Route>
              <Route path="products" element={<ProductsTable />}></Route>
              <Route path="inbox" element={<Inbox />}></Route>
              <Route path="orders" element={<OrderList />}></Route>
              <Route path="orders/:id" element={<OrderDetails />}></Route>
              <Route path="category" element={<ManageCategory />}></Route>
            </Routes>
          </Content>
        </Container>
      </Container>
    </>
  );
};
