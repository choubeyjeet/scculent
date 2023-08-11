import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";

//to create a new product item

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (data, rejectWithValue) => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/product/createProduct",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return response;
    } catch (error) {
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);

// to delete the product with ID

export const deleteProductWithID = createAsyncThunk(
  "products/deleteProductWithID",
  async (data, rejectWithValue) => {
    try {
      const response = await axiosInstance.post(
        `/api/v1/product/deleteProduct/${data.id}`
      );
      return response;
    } catch (error) {
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);

// to get the product with ID

export const getProductWithID = createAsyncThunk(
  "products/getProductWithID",
  async (data, rejectWithValue) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/product/productById/${data}`
      );

      return response;
    } catch (error) {
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);

// update the product with ID

export const updateTheProduct = createAsyncThunk(
  "products/updateTheProduct",
  async (data, rejectWithValue) => {
    try {
      const { formValue, id } = data;

      const response = await axiosInstance.put(
        `/api/v1/product/updateProduct/${id}`,
        formValue,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response;
    } catch (error) {
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);

//fetch all products

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (data, rejectWithValue) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/product/fetchAllProducts?type=${data.type}&search=${data.search}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);
// to delete the product Image with ID

export const deleteProductImageWithID = createAsyncThunk(
  "products/deleteProductWithID",
  async (data, rejectWithValue) => {
    try {
      const response = await axiosInstance.post(
        `/api/v1/product/deleteImage`,
        data
      );
      return response;
    } catch (error) {
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);
