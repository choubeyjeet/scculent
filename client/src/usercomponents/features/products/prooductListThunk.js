import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";

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

//fetch all products
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (data, rejectWithValue) => {
    try {
      if (data.type === "category") {
        const response = await axiosInstance.get(
          `/api/v1/product/fetchAllProducts?type=category&category=${data.category}`
        );
        return response.data;
      }

      if (data.type === "trending") {
        const response = await axiosInstance.get(
          `/api/v1/product/fetchAllProducts?type=trending&category=${data.category}`
        );
        return response.data;
      }

      if (data.type === "all") {
        const response = await axiosInstance.get(
          `/api/v1/product/fetchAllProducts?type=all`
        );
        return response.data;
      }
    } catch (error) {
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);
