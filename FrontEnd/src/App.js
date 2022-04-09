import React from "react";
import SideBar from "./UI/sidebar/SideBar";
import { Navigate, Route, Routes } from "react-router-dom";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Register from "./pages/Register";
//uncomment if you want to change user pw
// import Profile from "./components/Profile";
import Footer from "./layout/footer/Footer";
import Cart from "./components/cart/Cart";
import { useSelector } from "react-redux";
import NotificationBox from "./UI/Notification/NotificationBox";
import Notification from "./UI/Notification/Notification";

function App() {
  const isSidebarShown = useSelector((state) => state.UI.isSidebarShown);
  const isCartOpen = useSelector((state) => state.UI.isCartOpen);
  const isLoggedIn = useSelector((state) => state.auth.isLoggined);
  const notifications = useSelector((state) => state.UI.notifications);

  return (
    <div className="App">
      {isSidebarShown && <SideBar />}
      {isCartOpen && <Cart />}
      {!!notifications.length ? (
        <NotificationBox>
          {notifications.map((notification) => (
            <Notification msg={notification.msg} key={notification.id} />
          ))}
        </NotificationBox>
      ) : null}

      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" />} />
          {!isLoggedIn && <Route path="/auth" element={<Register />} />}
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
