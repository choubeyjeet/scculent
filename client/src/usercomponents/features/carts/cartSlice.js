import { createSlice } from "@reduxjs/toolkit";
import { fetchCart } from "./cartThunk";

let initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: undefined,
  successMessage: undefined,
  totalAmount: {},
  cartItems: {},
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state, action) => {
        return {
          ...state,
          isLoading: true,
          isError: false,
          isSuccess: false,
          errorMessage: undefined,
          successMessage: undefined,
          totalAmount: {},
          cartItems: {},
        };
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        let { totalTPrice, carts } = action.payload.data;

        return {
          ...state,
          isLoading: false,
          isError: false,
          isSuccess: false,
          errorMessage: undefined,
          successMessage: undefined,
          totalAmount: totalTPrice,
          cartItems: carts[0],
        };
      });
  },
});
export default cartSlice.reducer;
