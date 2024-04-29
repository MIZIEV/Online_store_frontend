import React, { useState } from "react";
import "./Form.module.scss";
import { registerUser } from "../../utils/AuthService";
import classes from "./RegistrationForm.module.scss"
import { NavLink } from "react-router-dom";
import mainImage from "../../images/main_image.png";

const RegistrationForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email address");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const userData = {
        firstName,
        lastName,
        username,
        email,
        password,
      };

      const success = await registerUser(userData);

      if (success) {
        setSuccess(true);
      } else {
        setError("Registration failed");
      }
    } catch (error) {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes["register-form"]}>
      <form className={classes["form"]} onSubmit={handleSubmit}>

        <h2 className={classes["title"]}>Створити особистий кабінет</h2>
        {loading && <div>Loading...</div>}
        {error && <div className="error">{error}</div>}
        {success && <div>Registration successful!</div>}

        <div className={classes["inputs-container"]}>
          <div className={classes["input-container"]}>
            <input
              className={classes["input-field"]}
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ім'я"
              required
            />
          </div>
          <div className={classes["input-container"]}>
            <input
              className={classes["input-field"]}
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Прізвище"
              required
            />
          </div>
          <div className={classes["input-container"]}>
            <input
              className={classes["input-field"]}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
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
          <div className={classes["input-container"]}>
            <input
              className={classes["input-field"]}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторити пароль"
              required
            />
          </div>
        </div>


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

        <button type="submit" className={classes["register-button"]}>
          Зареєструватися
        </button>
        <p className={classes['no-account']}>
          <a>Вже є особистий кабінет? <NavLink to="/signin">Увійти</NavLink></a>
        </p>
      </form>


      <div className={classes["image"]}>
        <img src={mainImage} alt="main image" />
      </div>

    </div>



  );
};

export default RegistrationForm;
