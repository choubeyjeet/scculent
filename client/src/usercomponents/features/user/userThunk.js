import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";
import axios from "axios";

export const login = createAsyncThunk(
  "/user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:9000/api/v1/login",
        data
      );
      localStorage.setItem("accesstoken", response.data.accessToken);
      localStorage.setItem("refreshtoken", response.data.refreshToken);
      localStorage.setItem("userid", response.data.userInfo._id);

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

export const regiter = createAsyncThunk(
  "/user/sign",

  async (data, rejectWithValue) => {
    try {
      const response = await axios.post("signup", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const forgetPassword = createAsyncThunk(
  "/user/sign",

  async (data, rejectWithValue) => {
    try {
      const response = await axios.post("signup", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
