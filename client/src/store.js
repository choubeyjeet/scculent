import { configureStore } from "@reduxjs/toolkit";

import productListSlice from "./admincomponents/features/productList/productListSlice";
import userSlice from "./admincomponents/features/login/userSlice";
import shopSlice from "./usercomponents/features/shopNow/shopSlice";
import cartSlice from "./usercomponents/features/carts/cartSlice";

export const store = configureStore({
  reducer: { productListSlice, userSlice, shopSlice, cartSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
