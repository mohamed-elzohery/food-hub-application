import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./storeTokens/Auth-Context";
import { CookiesProvider } from "react-cookie";
import {BrowserRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import store from './store'


ReactDOM.render(
  <AuthContextProvider>
    <Provider store={store}>
    <BrowserRouter>
    <CookiesProvider>
      <App />
    </CookiesProvider>
    </BrowserRouter>
      </Provider>
  </AuthContextProvider>,
  document.getElementById("root")
);
