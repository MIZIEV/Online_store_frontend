import React, { useState } from "react";
import classes from "./CheckoutPage.module.scss";
import BreadCrumb from "../components/BreadCrumb/BreadCrumb";
import { Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { selectCartItems, totalPrice, clearCart } from "../redux/cartSlice";
import { isUserLoggedIn } from "../utils/AuthService";
import PaymentBlockComponent from "../UI/PaymentBlock/PaymentBlockComponent";
import { addNewOrder } from "../utils/OrderService";
import ConfirmModal from "../UI/Modal/ConfirmModel";
import { validateCVV, validateCardNumber, validateExpirationDate, validatePhoneNumber } from "../utils/Validator";
import ErrorModal from "../UI/Modal/ErrorModal";

const CheckoutPage: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const firstName = localStorage.getItem("authenticatedFirstName");
  const lastName = localStorage.getItem("authenticatedLastName");
  const phoneNumber = localStorage.getItem("authenticatedPhonenumbar");
  const isAuthenticated = isUserLoggedIn();

  const cartItems = useSelector(selectCartItems);
  const totalPriceValue = useSelector(totalPrice);
  const [recepient, setRecepient] = useState<boolean>(false);
  const [deliveryPrice, setDeliveryPrice] = useState<number>(60);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const [creditCard, setCreditCard] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");
  const [cvv, setCvv] = useState("");

  const email = localStorage.getItem("authenticatedEmail")

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    city: "",
    deliveryMethod: "COURIER",
    paymentMethod: "CASH",
  })


  const iAmRecepientHandler = () => {
    setRecepient(!recepient);

    if (!recepient) {
      setFormData({
        ...formData,
        fullName: `${firstName} ${lastName}`,
        phoneNumber: `${phoneNumber}`
      });
    } else {
      setFormData({
        ...formData,
        fullName: "",
        phoneNumber: "",
        city: ""
      });
    }
  }

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value === "COURIER") {
      setDeliveryPrice(60)
    } else if (value === "NEW_POST_OFFICE") {
      setDeliveryPrice(50)
    } else if (value === "NEW_POST_COURIER") {
      setDeliveryPrice(120)
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();


    if (formData.fullName.length < 5) {
      errorMessages.push("В полі 'ПІП' повинно бути більше 5 символів!")
    }
    if (!validatePhoneNumber(formData.phoneNumber)) {
      errorMessages.push("Не коректний номер телефону!")
    }
    if (formData.city.length < 3) {
      errorMessages.push("В полі 'Місто' повинно бути більше 3 символів!")
    }

    if (errorMessages.length > 0) {
      setIsError(true);
      setErrorMessages(errorMessages);
      return;
    }

    if (formData.paymentMethod === "ONLINE") {
      if (!validateCardNumber(creditCard)) {
        errorMessages.push("Не коррекний номер картки!");
      }
      if (!validateExpirationDate(cardExpiration)) {
        errorMessages.push("Не коррекний термін придатності картки!");
      }
      if (!validateCVV(cvv)) {
        errorMessages.push("Не коррекний CVV код картки!");
      }
    }

    if (errorMessages.length > 0) {
      setErrorMessages(errorMessages);
      setIsError(true);
      return;
    }

    setModalOpen(true);
  };

  const handleConfirm = () => {
    const orderData = {
      totalAmount: totalPriceValue,
      status: false,
      deliveryMethod: formData.deliveryMethod,
      paymentMethod: formData.paymentMethod,
      fullName: formData.fullName,
      phoneList: cartItems,
      city: formData.city,
      phoneNumber: formData.phoneNumber,
      email: email
    };

    console.log(orderData)
    addNewOrder(orderData);
    dispatch(clearCart());

    if (isAuthenticated) {
      navigate(`/${firstName}/personal-page`);
    } else {
      navigate("/");
    }

    setModalOpen(false);
  };

  const changePayStatusHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormData((prevData) => ({ ...prevData, paymentMethod: value }));
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const closeModalHandler = () => {
    setErrorMessages([])
    setIsError(false);
  }

  return (
    <div className={classes.container}>

      <Outlet />

      {isError && <ErrorModal message={errorMessages} onClose={closeModalHandler} />}

      <BreadCrumb items={[{ path: "/", title: "Головна" },
      { path: "/phone/catalog", title: "/ товари" },
      { path: "/checkout", title: "/ Оформлення замовлення" }]} />

      <h2 className={classes.pageTitle}>Оформлення замовлення</h2>

      <form onSubmit={submitHandler}>
        <div className={classes.leftBlock}>
          <div className={classes.paymentForm}>
            <div className={classes.numberOfForm}>
              <svg width="50" height="50" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="30" fill="#ADBC9F" />
                <text x="30" y="35" textAnchor="middle" fill="black" fontSize="20" fontFamily="Arial">1</text>
              </svg>
            </div>

            <div className={classes.inputForm}>
              <h3 className={classes.inputTitle}>Ваші данні</h3>
              <input
                className={classes.dataInput}
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={inputChangeHandler}
                placeholder="Прізвище, ім'я, по батькові " />
              <input
                className={classes.dataInput}
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={inputChangeHandler}
                placeholder="Номер телефону" />
            </div>
          </div>

          <div className={classes.paymentForm}>
            <div className={classes.numberOfForm}>
              <svg width="50" height="50" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="30" fill="#ADBC9F" />
                <text x="30" y="35" textAnchor="middle" fill="black" fontSize="20" fontFamily="Arial">2</text>
              </svg>
            </div>

            <div className={classes.inputForm}>
              <h3 className={classes.inputTitle}>Ваші данні</h3>
              <input
                className={classes.dataInput}
                type="text"
                name="city"
                value={formData.city}
                onChange={inputChangeHandler}
                placeholder="Ваше місто" />

              {isAuthenticated && <FormGroup sx={{ margin: "10px 0px 30px 0px" }}>
                <FormControlLabel
                  control={<Checkbox sx={{
                    margin: "2px 0px",
                    '&.Mui-checked': {
                      color: "#436850"
                    }
                  }}
                    className={classes.checkboxStyle}
                    checked={recepient}
                    onChange={iAmRecepientHandler}
                  />}
                  label={<span className={classes.checkBoxLabel}>Я одержувач</span>}
                />
              </FormGroup>}

              <FormControl>
                <label className={classes.secondaryTitleLabel}>Спосіб доставки</label>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="deliveryMethod"
                  value={formData.deliveryMethod}
                  onChange={inputChangeHandler}
                >
                  <FormControlLabel defaultChecked value="COURIER" control={<Radio sx={{
                    '&.Mui-checked': {
                      color: '#436850'
                    }
                  }} />} label="Доставка кур'єром" />
                  <FormControlLabel value="NEW_POST_OFFICE" control={<Radio sx={{
                    '&.Mui-checked': {
                      color: '#436850'
                    }
                  }} />} label="У відділення Нової пошти" />
                  <FormControlLabel value="NEW_POST_COURIER" control={<Radio sx={{
                    '&.Mui-checked': {
                      color: '#436850'
                    }
                  }} />} label="Доставка кур'єром Нової пошти" />
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          <div className={classes.paymentForm}>
            <div className={classes.numberOfForm}>
              <svg width="50" height="50" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="30" fill="#ADBC9F" />
                <text x="30" y="35" textAnchor="middle" fill="black" fontSize="20" fontFamily="Arial">3</text>
              </svg>
            </div>
            <div className={classes.inputForm}>

              <FormControl>
                <h3 className={classes.inputTitle}>Оплата</h3>
                <label className={classes.secondaryTitleLabel}>Спосіб оплати</label>
                <RadioGroup

                  defaultValue="CASH"
                  name="radio-buttons-group"
                  onChange={changePayStatusHandler}
                  value={formData.paymentMethod}

                >
                  <FormControlLabel defaultChecked value="CASH" control={<Radio sx={{
                    '&.Mui-checked': {
                      color: '#436850'
                    }
                  }} />} label="Готівкою при отриманні" />
                  <FormControlLabel value="ONLINE" control={<Radio sx={{
                    '&.Mui-checked': {
                      color: '#436850'
                    }
                  }} />} label="Онлайн" />
                </RadioGroup>
              </FormControl>

              {
                formData.paymentMethod === "ONLINE" && <PaymentBlockComponent
                  creditCard={creditCard}
                  setCreditCard={setCreditCard}
                  cardExpiration={cardExpiration}
                  setCardExpiration={setCardExpiration}
                  cvv={cvv}
                  setCvv={setCvv}
                />
              }

            </div>
          </div>
        </div>

        <div className={classes.rightBlock}>
          <div className={classes.paymentForm}>

            <div className={classes.phoneList}>
              <h3 className={classes.inputTitle}>Склад замовлення</h3>
              {cartItems.map((item) => (
                <div
                  className={classes.phoneCard}
                  key={item.id}>

                  <div className={classes.image}>
                    <img src={item.image} />
                  </div>

                  <div className={classes.textBlock}>
                    <h3>{item.brand} {item.model} {`${item.rom.romSize} Гб`}</h3>
                    <p>Колір: {`${item.colorNameConverted}`}</p>
                    <p>Ціна: {`${item.price} грн`}</p>
                    <p>Кількість: {`${item.quantity} шт`}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>

          <hr />
          <div className={classes.paymentForm}>

            <div className={classes.inputForm}>
              <h3 className={classes.inputTitle}>У мене є промокод</h3>
              <input className={classes.dataInput} type="text" placeholder="Введіть промокод" />
              <button>Застосувати</button>
            </div>
          </div>
          <hr />

          <div className={classes.paymentForm}>
            <div className={classes.inputForm}>
              <h3 className={classes.inputTitle}>Разом до сплати</h3>

              <div className={classes.finalDataBlock}>
                <div className={classes.leftData}>
                  <p>Доставка</p>
                  <p>Разом до сплати</p>
                </div>

                <div className={classes.rightData}>
                  <p>{deliveryPrice} грн</p>
                  <p>{`${totalPriceValue + deliveryPrice} грн`}</p>
                </div>
              </div>

              <button type="submit">Замовлення підтверджую</button>
            </div>
          </div>
        </div>

      </form>
      <ConfirmModal
        open={modalOpen}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        orderData={{
          totalAmount: totalPriceValue + deliveryPrice,
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          city: formData.city,
          deliveryMethod: formData.deliveryMethod,
          paymentMethod: formData.paymentMethod,
        }}
      />
    </div>
  )
}

export default CheckoutPage