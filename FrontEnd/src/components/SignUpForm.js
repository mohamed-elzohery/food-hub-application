import React, { useContext, useState } from "react";
import classes from "../styles/SignUpForm.module.css";
import useInput from "../hooks/use-input";
import FormGroup from "./FormGroup";
import { useNavigate } from "react-router-dom";
import AuthContext from "../storeTokens/Auth-Context";
import axios from "axios";

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
  const [isLogin, setIsLogin] = useState(true);
  const authCtx = useContext(AuthContext);
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
    setIsLogin((prevState) => !prevState);
  };
  const onSumbitHandler = (e) => {
    e.preventDefault();
    console.log("Form is sumbitted successfully");
    resetNameHandler();
    resetEmailHandler();
    resetPasswordHandler();
    conresetPasswordHandler();

    if (isLogin) {
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
          authCtx.login(
            res.data.idToken,
            new Date(Date.now() + res.data.expiresIn * 1000)
          );
          navigate("/");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzTfDrGGGFjKW3KWnQHVSW6nq7P-F3DXU",
          {
            email: enteredEmail,
            password: enteredPassword,
            name: enteredName,
            returnSecureToken: true,
          }
        )
        .then((res) => {
          authCtx.login(
            res.data.idToken,
            new Date(Date.now() + res.data.expiresIn * 1000)
          );
          navigate("/");
        })
        .catch((err) => {
          alert(err.message);
          let errorMessage = "Authentication failed!";
          throw new Error(errorMessage);
        });

      // fetch(
      //   "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzTfDrGGGFjKW3KWnQHVSW6nq7P-F3DXU",
      //   {
      //     method: "POST",
      //     body: JSON.stringify({
      //       email: enteredEmail,
      //       password: enteredPassword,
      //       returnSecureToken: true,
      //     }),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // )
      //   .then((res) => {
      //     if (res.ok) {
      //       return res.json();
      //     } else {
      //       return res.json().then((data) => {
      //         let errorMessage = "Authentication failed!";
      //         throw new Error(errorMessage);
      //       });
      //     }
      //   })
      //   .then((data) => {
      //     authCtx.login(
      //       data.idToken,
      //       new Date(Date.now() + data.expiresIn * 1000)
      //     );
      //     // useNavigate("/");
      //     // history.replace("/");
      //   })
      //   .catch((err) => {
      //     alert(err.message);
      //   });
    }
  };

  return (
    <form onSubmit={onSumbitHandler} className={classes.form}>
      <h1>{isLogin ? "Log in Form" : "Sign Up Form"}</h1>

      {!isLogin ? (
        <FormGroup
          type="text"
          name="name"
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
      <div>
        {isLogin ? "Not a registerd user?" : "Already a registered user?"}
        {/* <Link to="/login"> Login!</Link> */}
        <button
          onClick={switchAuthModeHandler}
          type="button"
          className={classes.toggle}
        >
          {isLogin ? "Register" : "Login!"}
        </button>
      </div>

      <div className={classes["form-action"]}>
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
  );
};

export default SignUpForm;
