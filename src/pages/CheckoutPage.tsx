import React, { useState } from "react";
import classes from "./CheckoutPage.module.scss";
import BreadCrumb from "../components/BreadCrumb/BreadCrumb";
import { Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCartItems, totalPrice } from "../redux/cartSlice";
import { isUserLoggedIn } from "../utils/AuthService";
import PaymentBlockComponent from "../UI/PaymentBlock/PaymentBlockComponent";
import { addNewOrder } from "../utils/OrderService";

const CheckoutPage: React.FC = () => {

  const isAuthenticated = isUserLoggedIn();

  const cartItems = useSelector(selectCartItems);
  const totalPriceValue = useSelector(totalPrice);
  // const [deliveryMethod, setDeliveryMehtod] = useState<string>("COURIER");
  //const [paymentMethod, setPaymentMethod] = useState<string>("CASH");
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    city: "",
    deliveryMethod: "COURIER",
    paymentMethod: "CASH"
  })

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const orderData = {
      totalAmount: totalPriceValue,
      status: false,
      deliveryMethod: formData.deliveryMethod,
      paymentMethod: formData.paymentMethod,
      fullName: formData.fullName,
      phoneList: cartItems,
      city: formData.city,
      phoneNumber: formData.phoneNumber
    }
    try {
      const response = await addNewOrder(orderData);
    } catch (error) {
      console.error(error);
    }
  }

  const changePayStatusHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormData((prevData) => ({ ...prevData, paymentMethod: value }));
  };

  return (
    <div className={classes.container}>
      <BreadCrumb items={[{ path: "/", title: "Головна" },
      { path: "/phone/catalog", title: "/товари" },
      { path: "/checkout", title: "/Оформлення замовлення" }]} />

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
                  }} className={classes.checkboxStyle}
                    value=""
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
                  <FormControlLabel defaultChecked value="COURIER" control={<Radio />} label="Доставка кур'єром" />
                  <FormControlLabel value="NEW_POST_OFFICE" control={<Radio />} label="У відділення Нової пошти" />
                  <FormControlLabel value="NEW_POST_COURIER" control={<Radio />} label="Доставка кур'єром Нової пошти" />
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
                  <FormControlLabel defaultChecked value="CASH" control={<Radio />} label="Готівкою при отриманні" />
                  <FormControlLabel value="ONLINE" control={<Radio />} label="Онлайн" />
                </RadioGroup>
              </FormControl>

              {
                formData.paymentMethod === "ONLINE" && <PaymentBlockComponent />
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
                    <h3>{item.brand} {item.model}</h3>
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
                  <p>100 грн</p>
                  <p>{`${totalPriceValue} грн`}</p>
                </div>
              </div>

              <button>Замовлення підтверджую</button>
            </div>
          </div>
        </div>

      </form>
    </div>
  )
}

export default CheckoutPage