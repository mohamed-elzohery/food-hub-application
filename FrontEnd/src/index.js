import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import store from "./storeTokens/Auth-Context";
import { Provider } from "react-redux";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
