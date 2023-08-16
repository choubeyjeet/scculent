import React, { useEffect, useState } from "react";

import {
  Navbar,
  Nav,
  Button,
  Row,
  Col,
  InputGroup,
  Input,
  Badge,
  Avatar,
} from "rsuite";
import { Link, NavLink } from "react-router-dom";
import HomeIcon from "@rsuite/icons/legacy/Home";

import SearchIcon from "@rsuite/icons/Search";
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiFillHeart,
} from "react-icons/ai";
import { FaUserAlt, FaBars } from "react-icons/fa";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import "rsuite/dist/rsuite.min.css";
import logo from "./asset/image/logo.png";

import "./asset/css/Navbar.css";

import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../features/carts/cartThunk";

const CustomNav = ({ active, onSelect, onClose, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };
  let userId = localStorage.getItem("userid");
  let dispatch = useDispatch();
  const data = useSelector((state) => state.counterReducer);
  const handleLinkClick = () => {
    onSelect(""); // Clear the active event key
    onClose(); // Close the navbar
  };

  return (
    <Nav
      {...props}
      vertical
      activeKey={active}
      onSelect={onSelect}
      style={{ width: 100 }}
    >
      <Nav.Item href="/">Home</Nav.Item>

      <Nav.Item as={Link} to="/about">
        About
      </Nav.Item>

      <Nav.Item href="/products">Products</Nav.Item>

      <Nav.Item href="/contact">Contact Us</Nav.Item>
    </Nav>
  );
};

export default function NavbarHead({ setTotalSum }) {
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = React.useState("");
  const [totalItems, setTotalItems] = useState([]);
  const { isAuthenticated, user } = useSelector((state) => state.userSlice);
  const [navbarcolleps, setnavbarcolleps] = useState(false);
  const [currentDiv, setCurrentDiv] = useState(0);
  const handleNavbarClose = () => {
    setnavbarcolleps(false);
  };
  let dispatch = useDispatch();

  const handleClick = () => {
    setIsVisible(!isVisible);
  };
  let userId = localStorage.getItem("userid");
  const fetchByCart = async () => {
    try {
      const response = await dispatch(fetchCart(userId));

      setTotalItems(response.payload.data.carts[0].items);
      setTotalSum(response.payload.data.totalTPrice);
      // setIsLoading(false);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchByCart();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDiv((prevDiv) => (prevDiv + 1) % 3);
    }, 3000); // Change div every 2 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="headingline">
        <div className="headline-container" style={{ opacity: 1 }}>
          <h5
            className="headlinepara"
            style={{ display: currentDiv === 0 ? "block" : "none" }}
          >
            Call Us: +91 9528502281
          </h5>
          <h5
            className="headlinepara"
            style={{ display: currentDiv === 1 ? "block" : "none" }}
          >
            Email Us: succulentdhaba@gmail.com
          </h5>
          <h5
            className="headlinepara"
            style={{ display: currentDiv === 2 ? "block" : "none" }}
          >
            Find Us in Loc: Kailash Vatika Nursery
          </h5>
        </div>
      </div>
      <Navbar className="navclass">
        <Link to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" className="navlogo" />
          </Navbar.Brand>
        </Link>
        <Nav className="navbarcolleps nav_main" id="navcolleps">
          <Nav.Item as={Link} to="/" icon={<HomeIcon />}>
            Home
          </Nav.Item>

          <Nav.Item as={Link} to="/about">
            About
          </Nav.Item>

          <Nav.Item as={Link} to="/products">
            Products
          </Nav.Item>

          <Nav.Item as={Link} to="/contact">
            Contact Us
          </Nav.Item>
        </Nav>
        <Nav pullRight className="nav_mainright navbarcolleps" id="navcolleps">
          <Nav.Item>
            {isVisible && (
              <InputGroup className="searchbar">
                <Input />
                <InputGroup.Button>
                  <SearchIcon />
                </InputGroup.Button>
              </InputGroup>
            )}
          </Nav.Item>
          <Nav.Item
            className="serchiconnav"
            icon={<SearchIcon />}
            onClick={handleClick}
          ></Nav.Item>

          <Nav.Menu className="userprofile" icon={<AiOutlineUser />}>
            {isAuthenticated === true ? (
              <>
                <div style={{ padding: 10 }}>
                  {"Welcome" + " " + user?.firstname + " " + user?.lastname}
                </div>
                <div style={{ padding: 10 }}>
                  <NavLink to="/manageAddress">Manage Address</NavLink>
                </div>
                <Link to="/orderHistory">
                  <Nav.Item icon={<AiOutlineShoppingCart />}>
                    &nbsp;Order History
                  </Nav.Item>
                </Link>
                <Nav.Item icon={<LuLogOut />}>&nbsp;Log Out</Nav.Item>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Nav.Item icon={<FaUserAlt />}>&nbsp;Register</Nav.Item>
                </Link>
                <Link to="/login">
                  <Nav.Item icon={<LuLogIn />}>&nbsp;Login</Nav.Item>
                </Link>
              </>
            )}
          </Nav.Menu>
          {isAuthenticated && (
            <Nav.Item
              as={Link}
              to="/cart"
              className="dropdownCartmenu"
              icon={
                <Badge content={totalItems.length} className="badgenum">
                  <AiOutlineShoppingCart />
                </Badge>
              }
            ></Nav.Item>
          )}
        </Nav>

        <Nav pullRight>
          <Nav className="icons_in_mobile">
            <Nav.Item className="serchiconnav" onClick={handleClick}></Nav.Item>
            <Nav.Menu className="userprofile" icon={<AiOutlineUser />}>
              <Nav.Item icon={<FaUserAlt />}>&nbsp;Register</Nav.Item>
              <Nav.Item icon={<LuLogIn />} href="/login">
                <NavLink to="/login">&nbsp;Login</NavLink>
              </Nav.Item>
              <Nav.Item icon={<AiFillHeart />}>&nbsp;Wish List (0)</Nav.Item>
              <Nav.Item icon={<LuLogOut />}>&nbsp;Log Out</Nav.Item>
            </Nav.Menu>
            {}{" "}
            <Nav.Item
              className="dropdownCartmenu"
              icon={
                <Badge content="8" className="badgenum">
                  <AiOutlineShoppingCart />
                </Badge>
              }
            ></Nav.Item>
          </Nav>
          <Nav.Item>
            <span onClick={() => setnavbarcolleps(!navbarcolleps)}>
              {navbarcolleps ? (
                <GrClose fontSize={20} />
              ) : (
                <FaBars style={{ fontSize: 23 }} className="baricon" />
              )}
            </span>
          </Nav.Item>
        </Nav>
      </Navbar>
      <CustomNav
        active={active}
        onSelect={setActive}
        className={`navformobile ${navbarcolleps ? "active" : ""}`}
        onClose={handleNavbarClose}
      />
    </div>
  );
}
