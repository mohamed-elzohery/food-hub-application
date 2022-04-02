import { createSlice, configureStore } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const eksde = cookies.get("token");

const intialLoginState = {
  isLogin: true,
};
const loginSlice = createSlice({
  name: "login",
  initialState: intialLoginState,
  reducers: {
    loginAction: (state) => {
      state.isLogin = true;
    },
    logoutAction: (state) => {
      state.isLogin = false;
    },
    toggleLoginAction: (state) => {
      state.isLogin = !state.isLogin;
    },
  },
});
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
const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    auth: authSlice.reducer,
  },
});

export const { setToken, login, logout, setIsLoggedIn } = authSlice.actions;
export const { loginAction, logoutAction, toggleLoginAction } =
  loginSlice.actions;
export default store;
