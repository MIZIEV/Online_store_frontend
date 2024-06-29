import React, { useEffect } from "react";
import LoginForm from "../components/Forms/LoginForm";
import classes from "./SignIn.module.scss";
import { Outlet } from "react-router";
import mainImage from "../images/main_image.png";
import { logout } from "../utils/AuthService";

const SignInPage: React.FC = () => {
  useEffect(() => {
    logout();
  }, []);
  return (
    <>
      <Outlet />
      <div className={classes["page"]}>
        <div className={classes["container"]}>
          <div className={classes["login-section"]}>
            <h1>Увійти</h1>
            <LoginForm />
          </div>
          <div className={classes["hero-section"]}>
            <img src={mainImage} alt="main image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;