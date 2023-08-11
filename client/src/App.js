import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { UserLogin } from "./admincomponents/login/UserLogin";
import { UserSignUp } from "./admincomponents/login/UserSignUp";
import { AdminHomePage } from "./admincomponents/admin/AdminHomePage";
import { ProtectedRoute } from "./admincomponents/utility/ProtectedRoute";
import "./App.css";
import { axiosInstance } from "./config/axiosInstance";
import { useDispatch } from "react-redux";
import { userStatus } from "./admincomponents/features/login/userThunk";

import Viewcart from "./usercomponents/Navbar/Viewcart";
import Products from "./usercomponents/Products/Products";
import Cart from "./usercomponents/Cart/Cart";
import Home from "./usercomponents/Home/Home";
import About from "./usercomponents/Aboutus/About";
import Contact from "./usercomponents/Contactus/Contact";
import { Login } from "./usercomponents/Login/Login";
import ProductDetails from "./usercomponents/ProductDetails/ProductDetails";

function App() {
  let dispatch = useDispatch();
  let accessToken = localStorage.getItem("accesstoken");
  useEffect(() => {
    dispatch(userStatus(accessToken));
  }, []);

  return (
    <Routes>
      <Route path="/admin/login" element={<UserLogin />}></Route>
      {/* <Route path="/signup" element={<UserSignUp />}></Route> */}

      <Route index path="/" element={<Home />}></Route>
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/viewcart" element={<Viewcart />} />
      <Route path="/products/" element={<Products />} />
      <Route path="/products/:id" element={<Products />} />
      <Route path="/products/details/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      {/* Admin Routes */}
      <Route
        path="/admin/home/*"
        element={
          <ProtectedRoute>
            <AdminHomePage />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default App;
