import React, { useContext } from "react";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthContext from "./storeTokens/Auth-Context";
import Error from "./components/Error";
import Home from "./pages/Home";
import Header from "./layout/header/Header";
import SideBar from "./UI/sidebar/SideBar";
import Footer from "./layout/footer/Footer";
function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <div className="App">
      <Header />
      {/* <SideBar /> */}
      <main>
      <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Navigate to='/home' />} />
                {!isLoggedIn && <Route path="/login" element={<LoginForm />} />}
                {!isLoggedIn && <Route path="/Signup" element={<SignUpForm />} />}
                <Route path="*" element={<Error />} />
      </Routes>
      </main>
        <Footer />
    </div>
  );
}

export default App;
