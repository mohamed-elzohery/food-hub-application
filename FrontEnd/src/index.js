import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./storeTokens/Auth-Context";
import { CookiesProvider } from "react-cookie";
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
    <CookiesProvider>
      <App />
    </CookiesProvider>
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById("root")
);
