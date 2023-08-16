import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";
import axios from "axios";

// to get the product with ID
export const fetchAddressById = createAsyncThunk(
  "user/getAddressWithID",
  async (data, rejectWithValue) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/address/addressById/${data}`
      );

      return response;
    } catch (error) {
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);

//fetch all products
export const getAllAddress = createAsyncThunk(
  "products/getAllAddress",
  async (data, rejectWithValue) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/address/fetchAddress/?userId=${data.userID}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);

//create a new address
export const createAddress = createAsyncThunk(
  "products/getAllProducts",
  async (data, rejectWithValue) => {
    try {
      const response = await axiosInstance.post(
        `/api/v1/address/createAddress`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);

//update
export const updateAddressById = createAsyncThunk(
  "products/getAllProducts",
  async (data, rejectWithValue) => {
    try {
      const response = await axiosInstance.put(
        `/api/v1/address/updateAddress/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);
//delete
export const deleteAddressById = createAsyncThunk(
  "address/deleteAddressById",
  async (data, rejectWithValue) => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/address/deleteAddress/${data}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);

export const getDataByPincode = createAsyncThunk(
  "getData/byPincode",
  async (data, rejectWithValue) => {
    try {
      const address = await axios.get(
        "https://api.postalpincode.in/pincode/" + data
      );

      const userAddress = address.data[0].PostOffice[0];
      return userAddress;
    } catch (err) {
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);

//paymenst
export const getScrectKey = createAsyncThunk(
  "getData/byPincode",
  async (data, rejectWithValue) => {
    try {
      const response = await axiosInstance.get("/api/v1/payments/secretKey");

      return response;
    } catch (err) {
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);
