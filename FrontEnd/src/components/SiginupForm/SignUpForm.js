import React from "react";
import classes from "./SignUpForm.module.css";
import useInput from "../../hooks/use-input";
import FormGroup from "../FormGroup/FormGroup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken, login } from "../../slices/Auth-slice";
import { toggleLoginAction } from "../../slices/Login-State-slice";
import { UIActions } from "../../slices/UI-slice";
import GoogleOuath2 from "./GoogleOuath2";
import axios from "axios";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const usernameRegex = /^[a-zA-Z\s\.]*$/;
//^[A-Za-z]\w*$ to not accept any whitespaces
//^[a-zA-Z\s\.]*$ to accept only dots and spaces
export const validateName = (val) => {
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

export const validateEmail = (val) => {
  let email = val.toString().trim().toLowerCase();
  if (email === "") return { isValid: false, msg: "Email is required" };
  if (!email.match(emailRegex))
    return { isValid: false, msg: "Eamil is not valid" };
  return { isValid: true };
};

export const validatePassword = (val) => {
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
  const isLogin = useSelector((state) => state.login.isLogin);
  const dispatch = useDispatch();
  let navigate = useNavigate();

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

  const switchAuthModeHandler = () => {
    dispatch(toggleLoginAction());
  };
  const onSumbitHandler = (e) => {
    e.preventDefault();
    console.log("Form is sumbitted successfully");
    resetNameHandler();
    resetEmailHandler();
    resetPasswordHandler();
    conresetPasswordHandler();

    if (isLogin) {
      // "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzTfDrGGGFjKW3KWnQHVSW6nq7P-F3DXU",

      axios
        .post("http://127.0.0.1:8000/api/v1/login", {
          email: enteredEmail,
          password: enteredPassword,
          // returnSecureToken: true,
        })
        .then((res) => {
          console.log(res);
          dispatch(setToken(res.data.token));
          dispatch(login());
          navigate("/");
          const notificatioId = Date.now();
          dispatch(
            UIActions.addNotification({ msg: "Successfully logged in" })
          );
          setTimeout(
            () => dispatch(UIActions.removeNotification(notificatioId)),
            3000
          );
        })
        .catch((error) => {
          // alert(error.response.data.error.message);
          // console.log(error.response.data.error);
          const notificatioId = Date.now();
          dispatch(
            UIActions.addNotification({
              msg: error.response.data.error.message,
            })
          );
          setTimeout(
            () => dispatch(UIActions.removeNotification(notificatioId)),
            3000
          );

          // console.log(err.message);
          // alert(err.message);
        });
    } else {
      // "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzTfDrGGGFjKW3KWnQHVSW6nq7P-F3DXU",

      axios
        .post("http://127.0.0.1:8000/api/v1/register", {
          email: enteredEmail,
          password: enteredPassword,
          name: enteredName,
          role: "user",
        })
        .then((res) => {
          dispatch(setToken(res.data.token));
          dispatch(login());
          navigate("/");
          const notificatioId = Date.now();
          dispatch(
            UIActions.addNotification({ msg: "Successfully Signed Up" })
          );
          setTimeout(
            () => dispatch(UIActions.removeNotification(notificatioId)),
            3000
          );
        })
        .catch((error) => {
          alert(error.response.data.error.message);
        });
    }
  };

  return (
    <>
      <form onSubmit={onSumbitHandler} className={classes["order-form"]}>
        {!isLogin ? (
          <FormGroup
            type="text"
            name="Name"
            valueChangedHandler={nameChangeHandler}
            inputBlurHandler={nameBlurHandler}
            enteredValue={enteredName}
            inputHasError={nameInputHasError}
            errMsg={nameErrMsg}
          />
        ) : (
          ""
        )}
        <FormGroup
          type="text"
          name="Email"
          valueChangedHandler={emailChangeHandler}
          inputBlurHandler={emailBlurHandler}
          enteredValue={enteredEmail}
          inputHasError={emailInputHasError}
          errMsg={emailErrMsg}
        />

        <FormGroup
          type="password"
          name="Password"
          valueChangedHandler={passwordChangeHandler}
          inputBlurHandler={passwordBlurHandler}
          enteredValue={enteredPassword}
          inputHasError={passwordInputHasError}
          errMsg={passwordErrMsg}
        />
        {!isLogin ? (
          <FormGroup
            type="password"
            name="Confim Password"
            valueChangedHandler={conpasswordChangeHandler}
            inputBlurHandler={conpasswordBlurHandler}
            enteredValue={conenteredPassword}
            inputHasError={conpasswordInputHasError}
            errMsg={conpasswordErrMsg}
          />
        ) : (
          ""
        )}
        <p className={classes["question"]}>
          {isLogin ? "Not a registerd user?" : "Already a registered user?"}
          <button onClick={switchAuthModeHandler} type="button">
            {isLogin ? "Register" : "Login!"}
          </button>
        </p>

        <div className={classes["form-action"]}>
          <GoogleOuath2 />
          {isLogin ? (
            <button
              className={`${
                isEmailValid && isPasswordValid ? "" : classes.disabled
              }`}
            >
              {isLogin ? "Login" : "SignUp"}
            </button>
          ) : (
            <button
              className={`${
                isEmailValid &&
                isNameValid &&
                isPasswordValid &&
                conisPasswordValid
                  ? ""
                  : classes.disabled
              }`}
            >
              {isLogin ? "Login" : "SignUp"}
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
