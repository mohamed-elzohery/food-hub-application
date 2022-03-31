import React, { useContext, useState } from "react";
import classes from "../styles/LoginForm.module.css";
import useInput from "../hooks/use-input";
import FormGroup from "./FormGroup";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../storeTokens/Auth-Context";
import axios from "axios";

//some utility functions
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmail = (val) => {
  let email = val.toString().trim().toLowerCase();
  if (email === "") return { isValid: false, msg: "Email is required" };
  if (!email.match(emailRegex))
    return { isValid: false, msg: "Eamil is not valid" };
  return { isValid: true };
};

const validatePassword = (val) => {
  let password = val.toString().trim().toLowerCase();
  if (password === "") return { isValid: false, msg: "Password is required" };
  if (password.length < 8)
    return {
      isValid: false,
      msg: "Your password can't be less than 8 characters.",
    };
  return { isValid: true };
};

function LoginForm() {
  const [isLogin, setIsLogin] = useState(false);
  const authCtx = useContext(AuthContext);
  let navigate = useNavigate();

  //data from the hook
  const {
    enteredValue: enteredEmail,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    msg: emailErrMsg,
    isValid: isEmailValid,
    resetHandler: resetEmailHandler,
  } = useInput(validateEmail);

  //data from the hook
  const {
    enteredValue: enteredPassword,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    msg: passwordErrMsg,
    isValid: isPasswordValid,
    resetHandler: resetPasswordHandler,
  } = useInput(validatePassword);

  const onSumbitHandler = (e) => {
    e.preventDefault();
    console.log("Form is sumbitted successfully");
    resetEmailHandler();
    resetPasswordHandler();

    if (isLogin) {
      //to be added
    } else {
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzTfDrGGGFjKW3KWnQHVSW6nq7P-F3DXU",
          {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }
        )
        .then((res) => {
          console.log(res);
          authCtx.login(
            res.data.idToken,
            new Date(Date.now() + res.data.expiresIn * 1000)
          );
          navigate("/");
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <>
      <form onSubmit={onSumbitHandler} className={classes.form}>
        <h1>Log In Form</h1>
        <FormGroup
          type="text"
          name="email"
          valueChangedHandler={emailChangeHandler}
          inputBlurHandler={emailBlurHandler}
          enteredValue={enteredEmail}
          inputHasError={emailInputHasError}
          errMsg={emailErrMsg}
        />
        <FormGroup
          type="password"
          name="password"
          valueChangedHandler={passwordChangeHandler}
          inputBlurHandler={passwordBlurHandler}
          enteredValue={enteredPassword}
          inputHasError={passwordInputHasError}
          errMsg={passwordErrMsg}
        />
        <p>
          Not a registerd user?
          <Link to="/signup"> Register</Link>
        </p>

        <div className={classes["form-action"]}>
          <button
            className={`${
              isEmailValid && isPasswordValid ? "" : classes.disabled
            }`}
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
