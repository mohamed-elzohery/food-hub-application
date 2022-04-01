import { createSlice, configureStore } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const eksde = cookies.get("token");

const initialAuthState = {
  token: "",
  isLoggined: !!eksde,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      cookies.set("token", state.token, { path: "/" });
    },
    login: (state) => {
      state.isLoggined = true;
    },
    logout: (state) => {
      state.token = null;
      state.isLoggined = false;
      cookies.remove("token", { path: "/" });
    },
  },
});
const store = configureStore({
  reducer: authSlice.reducer,
});
export const { setToken, login, logout, setIsLoggedIn } = authSlice.actions;
export default store;
