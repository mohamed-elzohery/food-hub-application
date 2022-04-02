import React from "react";
import SignUpForm from "./components/SignUpForm";
import Home from "./pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Error from "./components/Error";
//uncomment if you want to change user pw
// import Profile from "./components/Profile";
import NavBar from "./UI/navbar/NavBar";
import Footer from "./layout/footer/Footer";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggined);
  return (
    <div className="App">
      <NavBar />
      {/* <SideBar /> */}
      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" />} />
          {!isLoggedIn && <Route path="/auth" element={<SignUpForm />} />}
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
