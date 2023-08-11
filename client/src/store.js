import { configureStore } from "@reduxjs/toolkit";

import productListSlice from "./admincomponents/features/productList/productListSlice";
import userSlice from "./admincomponents/features/login/userSlice";

export const store = configureStore({
  reducer: { productListSlice, userSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
