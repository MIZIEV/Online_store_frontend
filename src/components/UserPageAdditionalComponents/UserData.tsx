import React, { useState } from "react";
import classes from "./UserData.module.scss";
import { updateUserData } from "../../utils/UserService";

const UserData: React.FC = () => {
  
  const email = sessionStorage.getItem("authenticatedEmail") || "";
  const firstName = sessionStorage.getItem("authenticatedFirstName") || "";
  const lastName = sessionStorage.getItem("authenticatedLastName") || "";
  const phoneNumber = sessionStorage.getItem("authenticatedPhonenumbar") || "";

  const [userData, setUserData] = useState({
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    email: email,
  });

  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    phoneNumber: false,
    email: false,
    password: false,
  });

  const [newData, setNewData] = useState({ ...userData });
  const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" });
  const [passwordError, setPasswordError] = useState("");

  const fieldLabels = {
    firstName: "Ім'я",
    lastName: "Прізвище",
    phoneNumber: "Номер телефону",
    email: "Пошта",
  };

  const handleEditClick = (field: string) => {
    setEditMode({ ...editMode, [field]: true });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (field === "newPassword" || field === "confirmPassword") {
      setPasswords({ ...passwords, [field]: e.target.value });
    } else {
      setNewData({ ...newData, [field]: e.target.value });
    }
  };

  const handleSave = async (field: string) => {
    if (field === "password") {
      if (passwords.newPassword !== passwords.confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }
      // Call an API function to update the password here
      console.log("Password updated to:", passwords.newPassword);
      setPasswords({ newPassword: "", confirmPassword: "" });
      setPasswordError("");
    } else {
      setUserData({ ...userData, [field]: newData[field] });
      await updateUserData(email, { ...newData });
    }
    setEditMode({ ...editMode, [field]: false });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, field: string) => {
    if (e.key === "Enter") {
      handleSave(field);
    }
  };

  return (
    <div className={classes.container}>
      <h2>Редагувати профіль</h2>
      {Object.keys(userData).map((field) => (
        <div key={field} className={classes.inputContainer}>
          <label className={classes.label}>{fieldLabels[field]}</label>
          {editMode[field] ? (
            <div className={classes.editContainer}>
              <input
                type="text"
                value={newData[field]}
                onChange={(e) => handleChange(e, field)}
                onKeyPress={(e) => handleKeyPress(e, field)}
                className={classes.inputField}
              />
              <button onClick={() => handleSave(field)} className={classes.saveButton}>
                OK
              </button>
            </div>
          ) : (
            <div className={classes.viewContainer}>
              <span>{userData[field]}</span>
              <button onClick={() => handleEditClick(field)} className={classes.editButton}>
                Редагувати
              </button>
            </div>
          )}
        </div>
      ))}
      <div className={classes.inputContainer}>
        <label className={classes.label}>Пароль</label>
        {editMode.password ? (
          <div className={classes.editContainer}>
            <input
              type="password"
              value={passwords.newPassword}
              onChange={(e) => handleChange(e, "newPassword")}
              placeholder="Новий пароль"
              className={classes.inputField}
            />
            <input
              type="password"
              value={passwords.confirmPassword}
              onChange={(e) => handleChange(e, "confirmPassword")}
              placeholder="Повторити пароль"
              className={classes.inputField}
            />
            {passwordError && <div className={classes.error}>{passwordError}</div>}
            <button onClick={() => handleSave("password")} className={classes.saveButton}>
              Зберегти
            </button>
          </div>
        ) : (
          <div className={classes.viewContainer}>
            <span>********</span>
            <button onClick={() => handleEditClick("password")} className={classes.editButton}>
              Змінити пароль
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserData;
