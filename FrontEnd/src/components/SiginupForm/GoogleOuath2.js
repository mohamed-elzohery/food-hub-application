import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { setToken, login } from "../../slices/Auth-slice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "./GoogleOuath2.module.css";

function GoogleOuath2() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const isLogin = useSelector((state) => state.login.isLogin);
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const [showLoginButton, setLoginButton] = useState(true);

  const onLoginSuccess = (response) => {
    // console.log(response.profileObj.email);
    // console.log(response.profileObj.givenName);
    const userEmail = response.profileObj.email;
    const userFakePassword = "12345678";
    // setLoginButton(false);
    if (isLogin) {
      axios
        .post("http://127.0.0.1:8000/api/v1/login", {
          email: userEmail,
          password: userFakePassword,
          // returnSecureToken: true,
        })
        .then((res) => {
          dispatch(setToken(res.data.token));
          dispatch(login());
          navigate("/");
        })
        .catch((err) => {
          alert("username or password is incorrect");
          console.log(err.message);
        });
    } else {
      axios
        .post("http://127.0.0.1:8000/api/v1/register", {
          email: userEmail,
          password: userFakePassword,
          name: response.profileObj.givenName,
          // returnSecureToken: true,
        })
        .then((res) => {
          console.log(res);
          dispatch(setToken(res.data.token));
          dispatch(login());
          navigate("/");
        })
        .catch((err) => {
          alert("username or password is incorrect");
          console.log(err.message);
        });
    }
  };
  const onLoginFailure = (response) => {
    console.log(response, "login failure");
  };

  return (
    <div>
      {showLoginButton ? (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          // cookiePolicy={"single_host_origin"}
          className={classes["google-login"]}
        />
      ) : null}
    </div>
  );
}

export default GoogleOuath2;
