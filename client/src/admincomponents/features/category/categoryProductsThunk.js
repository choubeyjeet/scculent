import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/api/v1/admin/createcategory`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getAllCategoryData = createAsyncThunk(
  "category/getAllCategoryData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/admin/getallcategory`);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteCategoryById = createAsyncThunk(
  "category/getAllCategoryData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/api/v1/admin/deletecategorybyid`,
        data
      );
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
