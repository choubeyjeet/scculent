import "./assets/css/login.css";
import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Form,
  ButtonToolbar,
  Button,
  FlexboxGrid,
  Panel,
  Content,
  Navbar,
  Container,
  Header,
  Schema,
} from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/login/userThunk";

export const UserLogin = () => {
  const formRef = React.useRef();
  const [userData, setuserData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.userSlice);

  const model = Schema.Model({
    password: Schema.Types.StringType().isRequired("This field is required."),
    email: Schema.Types.StringType()
      .isEmail("Please enter a valid email address.")
      .isRequired("This field is required"),
  });

  const setValue = (value, name) => {
    setuserData({ ...userData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (formRef.current.check()) {
        const response = await dispatch(userLogin(userData));

        if (response.error.message === "Rejected") {
          console.log("sad");
          toast(response.payload.error);
        }
      }
    } catch (err) {}
  };
  if (isAuthenticated) {
    return <Navigate replace to="/admin/home/dashboard" />;
  }

  return (
    <>
      <div className="show-fake-browser login-page">
        <Container>
          <Header>
            <Navbar appearance="inverse">
              <Navbar.Brand>
                {/* <a as={Link} to="/" style={{ color: '#fff' }}>Brand</a> */}
              </Navbar.Brand>
            </Navbar>
          </Header>
          <Content className="marginTop">
            <FlexboxGrid justify="center">
              <FlexboxGrid.Item colspan={8}>
                <Panel header={<h3>Login</h3>} bordered>
                  <Form
                    fluid
                    model={model}
                    onSubmit={handleSubmit}
                    ref={formRef}
                  >
                    <Form.Group>
                      <Form.ControlLabel>Email address</Form.ControlLabel>
                      <Form.Control
                        name="email"
                        type="text"
                        onChange={(e) => {
                          setValue(e, "email");
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.ControlLabel>Password</Form.ControlLabel>
                      <Form.Control
                        name="password"
                        type="password"
                        autoComplete="off"
                        onChange={(e) => {
                          setValue(e, "password");
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <ButtonToolbar>
                        <Button appearance="primary" type="submit">
                          Sign in
                        </Button>
                        <Button appearance="link">Forgot password?</Button>
                      </ButtonToolbar>
                    </Form.Group>
                    {/* <div>New to Nursery?  <Link to="/signup">Create an account</Link></div> */}
                  </Form>
                </Panel>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Content>
        </Container>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};
