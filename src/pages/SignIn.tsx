import React from "react";
import LoginForm from "../components/Forms/LoginForm";
import classes from "./SignIn.module.scss";
import { Outlet } from "react-router";

const SignInPage: React.FC = () => {
  return (
    <>
      <Outlet/>
      <div className={classes["page"]}>
        <div className={classes["container"]}>
          <div className={classes["login-section"]}>
            <h1>Увійти</h1>
            <LoginForm />
          </div>
          <div className={classes["hero-section"]}>
            <div className={classes["banner"]}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
