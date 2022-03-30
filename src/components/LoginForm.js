import React from "react";
import classes from "../styles/LoginForm.module.css";
import useInput from "../hooks/use-input";
import FormGroup from "./FormGroup";
import { Link } from "react-router-dom";

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
  const {
    enteredValue: enteredEmail,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    msg: emailErrMsg,
    isValid: isEmailValid,
    resetHandler: resetEmailHandler,
  } = useInput(validateEmail);

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
      );
    </>
  );
}

export default LoginForm;
