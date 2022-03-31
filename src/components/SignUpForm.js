import React from "react";
import classes from "../styles/SignUpForm.module.css";
import useInput from "../hooks/use-input";
import FormGroup from "./FormGroup";
import { Link } from "react-router-dom";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const usernameRegex = /^[A-Za-z]\w*$/;

const validateName = (val) => {
  let name = val.toString().trim();
  if (name === "") return { isValid: false, msg: "Name is required" };
  if (name.length < 3)
    return {
      isValid: false,
      msg: "Your name can't be less than 3 characters.",
    };
  if (!name.match(usernameRegex))
    return { isValid: false, msg: "Name is not valid" };
  return { isValid: true };
};

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

const SignUpForm = () => {
  const {
    enteredValue: enteredName,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    msg: nameErrMsg,
    isValid: isNameValid,
    resetHandler: resetNameHandler,
  } = useInput(validateName);

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

  const validateconPassword = (val) => {
    let password = val.toString().trim().toLowerCase();
    if (password === "") return { isValid: false, msg: "Password is required" };
    if (password !== enteredPassword)
      return { isValid: false, msg: "Password doesn't match." };
    return { isValid: true };
  };

  const {
    enteredValue: conenteredPassword,
    hasError: conpasswordInputHasError,
    valueChangeHandler: conpasswordChangeHandler,
    inputBlurHandler: conpasswordBlurHandler,
    msg: conpasswordErrMsg,
    isValid: conisPasswordValid,
    resetHandler: conresetPasswordHandler,
  } = useInput(validateconPassword);

  const onSumbitHandler = (e) => {
    e.preventDefault();
    console.log("Form is sumbitted successfully");
    resetNameHandler();
    resetEmailHandler();
    resetPasswordHandler();
    conresetPasswordHandler();
  };

  return (
    <form onSubmit={onSumbitHandler} className={classes.form}>
      <h1>Sign Up Form</h1>
      <FormGroup
        type="text"
        name="name"
        valueChangedHandler={nameChangeHandler}
        inputBlurHandler={nameBlurHandler}
        enteredValue={enteredName}
        inputHasError={nameInputHasError}
        errMsg={nameErrMsg}
      />
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

      <FormGroup
        type="password"
        name="Confim Password"
        valueChangedHandler={conpasswordChangeHandler}
        inputBlurHandler={conpasswordBlurHandler}
        enteredValue={conenteredPassword}
        inputHasError={conpasswordInputHasError}
        errMsg={conpasswordErrMsg}
      />
      <p>
        Already registerd?
        <Link to="/login"> Login!</Link>
      </p>

      <div className={classes["form-action"]}>
        <button
          className={`${
            isEmailValid && isNameValid && isPasswordValid && conisPasswordValid
              ? ""
              : classes.disabled
          }`}
        >
          SignUp
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
