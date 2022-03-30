import React from "react";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Home />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/Signup" element={<SignUpForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
