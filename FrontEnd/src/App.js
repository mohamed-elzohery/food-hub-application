import React from "react";
import Header from "./layout/header/Header";
import SideBar from "./UI/sidebar/SideBar";
import SignUpForm from "./components/SignUpForm";
import { Navigate, Route, Routes } from "react-router-dom";
import Error from "./components/Error";
import Home from "./pages/Home";
//uncomment if you want to change user pw
// import Profile from "./components/Profile";
import NavBar from "./UI/navbar/NavBar";
import Footer from "./layout/footer/Footer";
import Cart from "./components/cart/Cart";
import { useSelector } from "react-redux";

function App() {
  const isSidebarShown = useSelector((state) => state.UI.isSidebarShown);
  const isCartOpen = useSelector((state) => state.UI.isCartOpen);
  const isLoggedIn = useSelector((state) => state.auth.isLoggined);
  return (
    <div className="App">
      <Header />
      {isSidebarShown && <SideBar />}
      {isCartOpen && <Cart />}
      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" />} />
          {!isLoggedIn && <Route path="/auth" element={<SignUpForm />} />}{" "}
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
