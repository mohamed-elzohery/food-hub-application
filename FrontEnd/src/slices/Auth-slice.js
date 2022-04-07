import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

const initialAuthState = {
  token,
  isLoggined: !!token,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      const tokenExpiration = action.payload.expiredDate;
      const ExpirationDateAbsolute = Date.now() + tokenExpiration;
      console.log(ExpirationDateAbsolute);
      cookies.set("token", state.token, {
        path: "/",
        expires: new Date(ExpirationDateAbsolute),
      });
      setTimeout(() => {
        state.token = null;
        state.isLoggined = false;
      }, ExpirationDateAbsolute);
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
