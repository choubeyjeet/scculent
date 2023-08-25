import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";

// to get the product with ID
export const createOrders = createAsyncThunk(
  "payment/order",
  async (data, rejectWithValue) => {
    try {
      const response = await axiosInstance.post(
        `/api/v1/payments/createOrder`,
        data
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
