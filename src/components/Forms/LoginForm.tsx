import React, { useState } from "react";
import classes from "./Form.module.scss";
import { loginUser, saveLoggedInUser } from "../../utils/AuthService";
import { NavLink, useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false); // Додали стан success

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email address");
      return;
    }

    if (password.length < 5) {
      setError("Password must be at least 5 characters long");
      return;
    }

    try {
      const userData = {
        email,
        password,
      };

      setLoading(true); // Встановлюємо стан загрузки на true
      const response = await loginUser(userData);

      if (response) {
        saveLoggedInUser(email, response.role, response.firstName, response.lastName, response.phoneNumber);
        navigate("/"); // Використовуємо функцію navigate для перенаправлення
      } else {
        setError("Login failed");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred"); // Встановлюємо повідомлення про помилку
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes["login-form"]}>
      <form className={classes["form"]} onSubmit={handleSubmit}>
        {loading && <div>Loading...</div>}
        {error && <div className="error">{error}</div>}
        <div className={classes["input-container"]}>
          <img
            src="/public/icons/mail.svg"
            className={classes["icon"]}
            alt=""
          />
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
          <img src="/public/icons/eye.svg" className={classes["icon"]} alt="" />
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
          <img src="/public/icons/googlebtn.svg" alt="" />
        </button>
        <button>
          <img src="/public/icons/facebookbtn.svg" alt="" />
        </button>
      </div>
      <p className={classes['no-account']}>
        <a href="">Немає особистого кабінету? <NavLink to="/signup">Зареєструватись</NavLink></a>
      </p>
    </div>
  );
};

export default LoginForm;
