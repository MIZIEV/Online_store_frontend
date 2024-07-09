import React, { useState } from "react";
import classes from "./UserData.module.scss";
import { changeUserPassword, deleteUser, updateUserData } from "../../utils/UserService";
import { useNavigate } from "react-router";
import NotificationModal from "../../UI/Modal/NotificationModal";

const UserData: React.FC = () => {

  const email = localStorage.getItem("authenticatedEmail") || "";
  const firstName = localStorage.getItem("authenticatedFirstName") || "";
  const lastName = localStorage.getItem("authenticatedLastName") || "";
  const phoneNumber = localStorage.getItem("authenticatedPhonenumbar") || "";

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
  const [passwordError, setPasswordError] = useState<string>("");
  const navigator = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const openModal = (message: string) => {
    setIsModalOpen(true);
    setModalMessage(message);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

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

      changeUserPassword(email, passwords.newPassword);

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

  const deleteUserHandler = () => {
    openModal("Ви впевнені, що хочете видалити акаунт?");
  };

  const handleConfirmDelete = () => {
    deleteUser(email).then(() => {
      localStorage.clear();
      navigator("/");
    }).catch((error) => {
      console.error(error);
    });
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
              name="passwords"
              value={passwords.newPassword}
              onChange={(e) => handleChange(e, "newPassword")}
              placeholder="Новий пароль"
              className={classes.inputField}
            />
            <input
              type="password"
              name="passwords"
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

      <div className={classes.deleteBlock}>
        <button onClick={deleteUserHandler} className={classes.deleteButton}>Видалити акаунт</button>
      </div>

      {isModalOpen && (
        <NotificationModal
          message={modalMessage}
          onClose={closeModal}
          onConfirm={handleConfirmDelete}
        />
      )}

    </div>
  );
};

export default UserData;