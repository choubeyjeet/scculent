import { createSlice } from "@reduxjs/toolkit";
import { login } from "./userThunk";

const initialState = {
  isAuthenticated: false,
  isError: false,
  isLoading: false,
  user: {},
  errorMessage: undefined,
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,

        isLoading: false,
        user: {},
        errorMessage: undefined,
      };
    });
    builder.addCase(login.fulfilled, (state, action) => {
      return {
        ...state,
        isError: false,
        errorMessage: undefined,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.userInfo,
      };
    });
    builder.addCase(login.rejected, (state, action) => {
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
export default usersSlice.reducer;
