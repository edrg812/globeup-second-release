import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import resellerCartReducer from "./cart/resellerCart";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    resellerCart: resellerCartReducer,
  },
});

export default store;
