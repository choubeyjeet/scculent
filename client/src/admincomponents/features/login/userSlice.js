import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userStatus } from "./userThunk";

const initialState = {
  isAuthenticated: false,
  isError: false,
  isLoading: false,
  user: {},
  errorMessage: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.userInfo,
      };
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      return {
        ...state,
        isError: true,
        isLoading: false,
        isAuthenticated: false,
        user: {},
        errorMessage: action.payload.error,
      };
    });

    builder.addCase(userStatus.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(userStatus.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    });
    builder.addCase(userStatus.rejected, (state, action) => {
      return {
        ...state,
        isError: true,
        isLoading: false,
        isAuthenticated: false,
        user: {},
        errorMessage: action.payload.error,
      };
    });
  },
});

export const { reducer } = userSlice;
export default userSlice.reducer;
