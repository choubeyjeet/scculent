import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import TagNumberIcon from "@rsuite/icons/TagNumber";
import React from "react";
import { Link } from "react-router-dom";
import OperatePeopleIcon from "@rsuite/icons/OperatePeople";

import MessageIcon from "@rsuite/icons/Message";
import TaskIcon from "@rsuite/icons/Task";

const styles = {
  width: "100%",
  maxWidth: 240,
  display: "inline-table",
  marginRight: 10,
};

export const AdminHomePageSideNav = (props) => {
  const [activeKey, setActiveKey] = React.useState("1");
  const [openKeys, setOpenKeys] = React.useState(["3", "4"]);

  const onOpenChange = (openKeys) => {
    setOpenKeys(openKeys);
  };

  const setActiveKeyM = (e, value) => {
    setActiveKey(e);
    console.log(value);

    props.setHeading(value);
  };

  return (
    <>
      <div style={styles}>
        <Sidenav
          style={{ height: "100vh" }}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          appearance="inverse"
        >
          <Sidenav.Body>
            <Nav activeKey={activeKey} className="navLinks">
              <Nav.Item
                eventKey="1"
                as={Link}
                onSelect={(e) => {
                  setActiveKeyM(e, "Dashboard");
                }}
                to="dashboard"
                icon={<DashboardIcon />}
              >
                Dashboard
              </Nav.Item>
              <Nav.Item
                eventKey="2"
                as={Link}
                onSelect={(e) => {
                  setActiveKeyM(e, "Products List");
                }}
                to="products"
                icon={<TagNumberIcon />}
              >
                Product Page
              </Nav.Item>
              <Nav.Item
                eventKey="3"
                as={Link}
                to="users"
                onSelect={(e) => {
                  setActiveKeyM(e, "Users List");
                }}
                icon={<OperatePeopleIcon />}
              >
                Users
              </Nav.Item>

              <Nav.Item
                eventKey="4"
                as={Link}
                to="orders"
                onSelect={(e) => {
                  setActiveKeyM(e, "Orders List");
                }}
                icon={<TaskIcon />}
              >
                Orders
              </Nav.Item>

              <Nav.Item
                eventKey="5"
                as={Link}
                to="inbox"
                onSelect={(e) => {
                  setActiveKeyM(e, "Inbox");
                }}
                icon={<MessageIcon />}
              >
                Inbox
              </Nav.Item>

              {/* <Nav.Menu eventKey="4" title="Settings" icon={<GearCircleIcon />}>
        <Nav.Item eventKey="4-1">Applications</Nav.Item>
        <Nav.Item eventKey="4-2">Channels</Nav.Item>
        <Nav.Item eventKey="4-3">Versions</Nav.Item>
        <Nav.Menu eventKey="4-5" title="Custom Action">
          <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
          <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
        </Nav.Menu>
      </Nav.Menu> */}
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
    </>
  );
};
