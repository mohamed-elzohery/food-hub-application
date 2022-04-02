import React, { useContext } from "react";
// import SignUpForm from "./components/SignUpForm";
// import LoginForm from "./components/LoginForm";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthContext from "./storeTokens/Auth-Context";
import Error from "./components/Error";
import Home from "./pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Error from "./components/Error";
//uncomment if you want to change user pw
// import Profile from "./components/Profile";
import NavBar from "./UI/navbar/NavBar";
import Footer from "./layout/footer/Footer";
import Cart from "./components/cart/Cart";
import { useSelector } from "react-redux";
function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const isSidebarShown = useSelector(state => state.UI.isSidebarShown);
  const isCartOpen = useSelector(state => state.UI.isCartOpen);
  console.log(isCartOpen)
  return (
    <div className="App">
      <Header />
      {isSidebarShown && <SideBar />}
      {isCartOpen && <Cart />}
      <main>
      <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Navigate to='/home' />} />
                {/* {!isLoggedIn && <Route path="/login" element={<LoginForm />} />}
                {!isLoggedIn && <Route path="/Signup" element={<SignUpForm />} />} */}
                <Route path="*" element={<Error />} />
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
