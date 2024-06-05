import React, { useState } from "react";
import "./Form.module.scss";
import { registerUser } from "../../utils/AuthService";
import classes from "./RegistrationForm.module.scss";
import { NavLink } from "react-router-dom";
import mainImage from "../../images/main_image.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
      toast.error("Не правильна email адресса");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      toast.error("Пароль повинен бути не меньше 6 символів");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Паролі не співпадають");
      setLoading(false);
      return;
    }

    try {
      const userData = {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      };

      const success = await registerUser(userData);

      if (success) {
        setSuccess(true);
        toast.success("Ви успішно зареєструвалися, тепер увійдіть в свій обліковий запис.");
      } else {
        setError("Помилка реєстрації");
        toast.error("Помилка реєстрації")
      }
    } catch (error) {
      setError("Помилка реєстрації");
      toast.error("Помилка реєстрації");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes["register-form"]}>
      <ToastContainer />
      <form className={classes["form"]} onSubmit={handleSubmit}>
        <h2 className={classes["title"]}>Створити особистий кабінет</h2>

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
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Номер телефону"
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