import React, { useState, useEffect, useLayoutEffect } from "react";
import { axiosInstance } from "../../../config/axiosInstance";

import { Drawer, Placeholder, Panel, Grid, Row, Col } from "rsuite";

export const UserInfoModel = (props) => {
  const { open, setOpen, userID } = props;
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const setOpenD = async () => {
    setOpen(!open);
  };
  useEffect(() => {
    let fetchData = async () => {
      var userData = await axiosInstance.get(`/api/v1/profile/${userID}`);

      if (userData.status === 200) {
        setLoading(false);
        setUserInfo(userData?.data);
      }
    };
    fetchData();
  }, [open]);

  const userInformation = () => {
    return (
      <>
        <Grid fluid>
          <Row className="show-grid">
            <Col md={11}>
              <Panel
                shaded
                bordered
                bodyFill
                style={{ display: "inline-block", width: 240 }}
              >
                <img src={userInfo?.userInfo?.profilePic} height="240" />
                <Panel
                  header={`${
                    userInfo?.userInfo?.firstname +
                    " " +
                    userInfo?.userInfo?.lastname
                  }`}
                >
                  <small>{userInfo?.userInfo?.email}</small>
                </Panel>
              </Panel>
            </Col>
            <Col md={2}></Col>
            <Col md={11}>
              Address:A suite of React components, sensible UI design, and a
              friendly development experience.
            </Col>
          </Row>
        </Grid>
      </>
    );
  };

  return (
    <>
      <Drawer open={open} onClose={setOpenD}>
        <Drawer.Header>
          <Drawer.Title>User Information</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
          {loading ? <Placeholder.Paragraph /> : <>{userInformation()}</>}
        </Drawer.Body>
      </Drawer>
    </>
  );
};
