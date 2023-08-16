import React, { useState } from "react";
import {
  Form,
  Button,
  FlexboxGrid,
  Panel,
  Content,
  Container,
  Schema,
} from "rsuite";
import "./assets/login/login.css"; // Make sure this CSS file has your basic styles
import { login } from "../features/user/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../admincomponents/features/login/userThunk";
import { Navigate } from "react-router-dom";

// Import your customized styles for the login page

export const Login = () => {
  const formRef = React.useRef();
  let dispatch = useDispatch();
  let { isAuthenticated } = useSelector((state) => state.userSlice);
  const [userData, setUserData] = useState({ email: "", password: "" });

  const model = Schema.Model({
    password: Schema.Types.StringType().isRequired("This field is required."),
    email: Schema.Types.StringType()
      .isEmail("Please enter a valid email address.")
      .isRequired("This field is required"),
  });

  const setValue = (value, name) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      console.log(userData);
      if (formRef.current.check()) {
        const response = await dispatch(userLogin(userData));
        console.log(response);
      }

      // Your form submission logic here
    } catch (err) {}
  };
  if (isAuthenticated === true) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="login-container">
      <Container>
        <Content className="marginTop">
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={8} className="formLogin">
              <Panel header={<h3>Login</h3>} bordered className="login-form">
                <Form fluid model={model} onSubmit={handleSubmit} ref={formRef}>
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
                    <Button appearance="primary" type="submit">
                      Sign in
                    </Button>
                    <Button appearance="link">Forgot password?</Button>
                  </Form.Group>
                </Form>
                Don't Have Account?
                <Button appearance="link">Create Account</Button>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    </div>
  );
};
