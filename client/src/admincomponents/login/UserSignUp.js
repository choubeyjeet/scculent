import "./assets/css/login.css";
import { Link } from "react-router-dom";
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { Form, ButtonToolbar, Button, FlexboxGrid, Panel, Content, Navbar, Container, Header } from "rsuite";
import {userSignUp} from "../features/login/userThunk";



export const UserSignUp = ()=>{

const [userData, setuserData] = useState({username:"", password:"", mobileNumber: "", userEmail:""});
const dispatch = useDispatch()

const userDataS = (val, name) =>{
 setuserData({...userData, [name]: val});
 
}

const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(userSignUp(userData));
}

return (<>    <div className="show-fake-browser login-page">
    {console.log(userData)}
<Container>
  <Header>
    <Navbar appearance="inverse">
      <Navbar.Brand>
        {/* <a as={Link} to="/new" style={{ color: '#fff' }}>Brand</a> */}
      </Navbar.Brand>
    </Navbar>
  </Header>
  <Content className="marginTop">
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={8}>
        <Panel header={<h3>Create Account</h3>} bordered>
          <Form fluid>
            <Form.Group>
              <Form.ControlLabel>Your name</Form.ControlLabel>
              <Form.Control name="username" placeholder="First and last name" required onChange={(e)=>{userDataS(e, "username")}} />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Mobile Numbers</Form.ControlLabel>
              <Form.Control name="mobileNumber" placeholder="Mobile Number"  required onChange={(e)=>{userDataS(e, "mobileNumber")}}/>
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name="userEmail" placeholder="Enter Email Address required" type="email" required onChange={(e)=>{userDataS(e, "userEmail")}}/>
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Password</Form.ControlLabel>
              <Form.Control name="password" type="password" autoComplete="off" placeholder="At least 6 characters" required onChange={(e)=>{userDataS(e, "password")}}/>
            </Form.Group>
            <Form.Group>
              <ButtonToolbar>
                <Button appearance="primary" type="submit" onClick={handleSubmit}>Sign Up</Button>
              
              </ButtonToolbar>
            </Form.Group>
            <div>Already have account?  <Link to="/login">Login</Link></div>
          </Form>
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </Content>

</Container>
</div>


</>)
}