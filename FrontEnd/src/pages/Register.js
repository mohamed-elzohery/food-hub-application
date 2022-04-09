import React from "react";
import classes from "./Register.module.css";
import SignUpForm from "../components/SiginupForm/SignUpForm";
import { useSelector } from "react-redux";
import NavBar from "../UI/navbar/NavBar";

const Register = () => {
  const isLogin = useSelector((state) => state.login.isLogin);
  return (
    <section className={classes.register}>
      <NavBar />
      <h1 className={classes.header}>{isLogin ? "Login" : "Register"}</h1>
      <div className={classes["form-div"]}>
        <SignUpForm />
      </div>
    </section>
  );
};

export default Register;
