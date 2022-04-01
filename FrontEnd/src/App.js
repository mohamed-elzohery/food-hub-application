import React, { useContext } from "react";
import SignUpForm from "./components/SignUpForm";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContext from "./storeTokens/Auth-Context";
import Error from "./components/Error";
import Blank from "./components/Blank";
import Profile from "./components/Profile";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <div className="App">
      <BrowserRouter>
        <Home />
        <Routes>
          <Route path="/home" element={<Blank />} />
          <Route path="/" element={<Blank />} />
          {isLoggedIn && <Route path="profile" element={<Profile />} />}
          {!isLoggedIn && <Route path="/auth" element={<SignUpForm />} />}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
