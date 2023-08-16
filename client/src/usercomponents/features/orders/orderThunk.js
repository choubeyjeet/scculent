import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";

// to get the product with ID
export const getOrder = createAsyncThunk(
  "orders/fetchAllOrders",
  async (ds, rejectWithValue) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/payments/fetchAllOrders`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (data, rejectWithValue) => {
    console.log(data);
    try {
      const response = await axiosInstance.post(
        `/api/v1/payments/verifyOrder`,
        data,
        {
          headers: {
            "x-razorpay-signature": data.response.razorpay_signature,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);
