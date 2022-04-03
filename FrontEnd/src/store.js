import { configureStore } from "@reduxjs/toolkit";
import UISlice from "./slices/UI-slice";
import cartSlice from "./slices/Cart-slice";
import loginSlice from "./slices/Login-State-slice";
import authSlice from "./slices/Auth-slice";

const store = configureStore({
  reducer: {
    UI: UISlice.reducer,
    cart: cartSlice.reducer,
    login: loginSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
