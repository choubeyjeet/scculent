import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";

//add to Cart
export const addToCart = createAsyncThunk(
  "user/addToCart",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await axiosInstance.post("/api/v1/addToCart", data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

//fetch cart ;
export const fetchCart = createAsyncThunk(
  "user/fetchByCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/getCart?userId=${data}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

//get item is in cart or not

export const getCartItem = createAsyncThunk(
  "user/getcartitem",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/getcartitem?userId=${data.userId}&productId=${data.productId}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

//update cart by id

export const updateCart = createAsyncThunk(
  "user/updateCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/api/v1/updateCart", data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

//delete cart by id

export const deleteCart = createAsyncThunk(
  "user/deleteCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/v1/deleteCart", data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
