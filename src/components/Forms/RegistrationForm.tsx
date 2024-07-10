import React, { useState } from "react";
import "./Form.module.scss";
import { registerUser } from "../../utils/AuthService";
import classes from "./RegistrationForm.module.scss";
import { NavLink } from "react-router-dom";
import mainImage from "../../images/main_image.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validatePhoneNumber } from "../../utils/Validator";
import FaceboocIcon from "../../UI/IconsComponents/FacebookIcon";
import GoogleIcon from "../../UI/IconsComponents/GoogleIcon";

const RegistrationForm: React.FC = () => {

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Не правильна email адресса!");
      return;
    }

    if (password.length < 6) {
      setError("Пароль повинен бути не меньше 6 символів!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Паролі не співпадають!");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError("Не коректний номер телефону!");
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
        setError("");
        toast.success("Ви успішно зареєструвалися, тепер увійдіть в свій обліковий запис.");
      } else {
        setError("Помилка реєстрації");
      }
    } catch (error) {
      if (error.message === "Email already exists!!!") {
        setError("Юзер з данним email вже зареєстрований!");
      } else {
        setError("Помилка реєстрації");
      }
    }
  };

  return (
    <div className={classes["register-form"]}>
      <ToastContainer />

      <form className={classes["form"]} onSubmit={handleSubmit}>
        <h2 className={classes["title"]}>Створити особистий кабінет</h2>

        {error && <div className={classes["error"]}>{error}</div>}

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
            <FaceboocIcon />
          </button>
          <button>
            <GoogleIcon />
          </button>
        </div>

        <button type="submit" className={classes["register-button"]}>
          Зареєструватися
        </button>
        <p className={classes['no-account']}>
          <a>Вже є особистий кабінет? <NavLink className={classes['link']} to="/signin">Увійти</NavLink></a>
        </p>
      </form>

      <div className={classes["image"]}>
        <img src={mainImage} alt="main image" />
      </div>
    </div>
  );
};

export default RegistrationForm;