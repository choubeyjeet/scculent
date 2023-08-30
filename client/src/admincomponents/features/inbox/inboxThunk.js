import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";

export const getInbox = createAsyncThunk(
  "admin/inbox",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/admin/inbox?page=${data.page}&perPage=${data.perPage}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
