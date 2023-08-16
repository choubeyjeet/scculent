import { createSlice } from "@reduxjs/toolkit";
// import { login } from "./userThunk";

const initialState = {
  isError: false,
  isLoading: false,
  user: {},
  address: undefined,
  errorMessage: undefined,
};

const shopSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAddressDataCart: (state, action) => {
      return {
        ...state,
        address: action.payload.addressId,
      };
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(login.pending, (state, action) => {
  //       return {
  //         ...state,
  //         isLoading: true,
  //         isAuthenticated: false,

  //         isLoading: false,
  //         user: {},
  //         errorMessage: undefined,
  //       };
  //     });
  //     builder.addCase(login.fulfilled, (state, action) => {
  //       return {
  //         ...state,
  //         isError: false,
  //         errorMessage: undefined,
  //         isLoading: false,
  //         isAuthenticated: true,
  //         user: action.payload.userInfo,
  //       };
  //     });
  //     builder.addCase(login.rejected, (state, action) => {
  //       return {
  //         ...state,
  //         isError: true,
  //         isLoading: false,
  //         isAuthenticated: false,
  //         user: {},
  //         errorMessage: action.payload.error,
  //       };
  //     });

  //     builder.addCase(userStatus.pending, (state, action) => {
  //       return {
  //         ...state,
  //         isLoading: true,
  //       };
  //     });
  //     builder.addCase(userStatus.fulfilled, (state, action) => {
  //       return {
  //         ...state,
  //         isLoading: false,
  //         isAuthenticated: true,
  //         user: action.payload,
  //       };
  //     });
  //     builder.addCase(userStatus.rejected, (state, action) => {
  //       return {
  //         ...state,
  //         isError: true,
  //         isLoading: false,
  //         isAuthenticated: false,
  //         user: {},
  //         errorMessage: action.payload.error,
  //       };
  //     });
  //   },
});

export const { setAddressDataCart } = shopSlice.actions;
export default shopSlice.reducer;
