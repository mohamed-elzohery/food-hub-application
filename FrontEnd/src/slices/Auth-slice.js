import { createSlice } from "@reduxjs/toolkit";
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
      cookies.set("token", state.token, {
        path: "/",
        expires: new Date(Date.now() + 3600 * 1000),
      });
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

export const { setToken, login, logout } = authSlice.actions;
export default authSlice;
