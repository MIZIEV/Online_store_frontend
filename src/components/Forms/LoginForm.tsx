import React, { useState } from "react";
import classes from "./Form.module.scss";
import { loginUser, saveLoggedInUser } from "../../utils/AuthService";
import { NavLink, useNavigate } from "react-router-dom";
import FaceboocIcon from "../../UI/IconsComponents/FacebookIcon";
import GoogleIcon from "../../UI/IconsComponents/GoogleIcon";

const LoginForm: React.FC = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Наданий Вами електронний адрес має неправильний формат!");
      return;
    }

    if (password.length < 5) {
      setError("Пароль повинен бути не меньше 5 символів!");
      return;
    }

    try {
      const userData = {
        email,
        password,
      };

      setLoading(true);
      const response = await loginUser(userData);

      if (response) {
        saveLoggedInUser(email, response.role, response.firstName, response.lastName, response.phoneNumber);
        navigate("/");
      } else {
        setError("Електронна адреса або пароль невірні!");
      }
    } catch (error) {
      console.error(error);
      setError("Електронна адреса або пароль невірні!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes["login-form"]}>

      <form className={classes["form"]} onSubmit={handleSubmit}>
        {loading && <div>Loading...</div>}
        {error && <div className={classes["error"]}>{error}</div>}

        <div className={classes["input-container"]}>

          <input
            className={classes["input-field"]}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Пошта"
            required
          />
        </div>
        <div className={classes["input-container"]}>
          <input
            className={classes["input-field"]}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            required
          />
        </div>
        <button type="submit" className={classes["login-button"]}>
          Увійти
        </button>
      </form>
      <p className={classes["forgot-password"]}>
        <a href="">Забули пароль?</a>
      </p>
      <div className={classes["or"]}>
        <h2>
          <span>або</span>
        </h2>
      </div>
      <div className={classes["buttons-section"]}>

        <button>
          <FaceboocIcon />
        </button>

        <button>
          <GoogleIcon />
        </button>

      </div>
      <p className={classes['no-account']}>
        <p>Немає особистого кабінету? <NavLink className={classes['link']} to="/signup">Зареєструватись</NavLink></p>
      </p>
    </div>
  );
};

export default LoginForm;