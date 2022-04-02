import { createSlice } from "@reduxjs/toolkit";

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
    registerAction: (state) => {
      state.isLogin = false;
    },
    toggleLoginAction: (state) => {
      state.isLogin = !state.isLogin;
    },
  },
});

export const { loginAction, registerAction, toggleLoginAction } =
  loginSlice.actions;

export default loginSlice;
