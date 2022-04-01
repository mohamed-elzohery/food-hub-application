import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../storeTokens/Auth-Context";
import classes from "../styles/ProfileForm.module.css";
import { validatePassword } from "./SignUpForm";
import useInput from "../hooks/use-input";
import axios from "axios";

function ProfileForm() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

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

  const submitHandler = (e) => {
    e.preventDefault();
    resetPasswordHandler();
    conresetPasswordHandler();
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCzTfDrGGGFjKW3KWnQHVSW6nq7P-F3DXU",
        {
          idToken: authCtx.token,
          password: enteredPassword,
          returnSecureToken: false,
        }
      )
      .then((res) => {
        alert("Password updated successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            placeholder="Enter new password"
          />
          {passwordInputHasError && <p>{passwordErrMsg}</p>}
          <input
            type="password"
            id="con-new-password"
            value={conenteredPassword}
            onChange={conpasswordChangeHandler}
            onBlur={conpasswordBlurHandler}
            placeholder="Confirm password"
          />
          {conpasswordInputHasError && <p>{conpasswordErrMsg}</p>}
        </div>
        <div className={classes["action"]}>
          <button
            className={`${
              isPasswordValid && conisPasswordValid ? "" : classes.disabled
            }`}
          >
            Change Password
          </button>
        </div>
      </form>
    </>
  );
}

export default ProfileForm;
