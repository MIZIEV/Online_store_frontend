import React from "react";
import classes from "./CheckoutPage.module.scss";
import BreadCrumb from "../components/BreadCrumb/BreadCrumb";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from "@mui/material";

const CheckoutPage: React.FC = () => {
  return (
    <div className={classes.container}>
      <BreadCrumb items={[{ path: "/", title: "Головна" },
      { path: "/phone/catalog", title: "/товари" },
      { path: "/checkout", title: "/Оформлення замовлення" }]} />

      <h2 className={classes.pageTitle}>Оформлення замовлення</h2>

      <form>
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
              <input type="text" placeholder="Прізвище, ім'я, по батькові " />
              <input type="text" placeholder="Номер телефону" />
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
              <input type="text" placeholder="Ваше місто" />

              <FormGroup sx={{ margin: "10px 0px 30px 0px" }}>
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
              </FormGroup>
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
                <FormLabel id="demo-radio-buttons-group-label">Спосіб оплати</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="Готівкою при отриманні" control={<Radio />} label="Готівкою при отриманні" />
                  <FormControlLabel value="Google pay" control={<Radio />} label="Google pay" />
                  <FormControlLabel value="Apple pay" control={<Radio />} label="Apple pay" />
                </RadioGroup>
              </FormControl>
            </div>
          </div>

        </div>


        <div className={classes.rightBlock}>
          <div className={classes.paymentForm}>
            <h3 className={classes.inputTitle}>Склад замовлення</h3>


          </div>

          <hr />
          <div className={classes.paymentForm}>

            <div className={classes.inputForm}>
              <h3 className={classes.inputTitle}>У мене є промокод</h3>
              <input type="text" placeholder="Введіть промокод" />
              <button>Застосувати</button>
            </div>
          </div>
          <hr />

          <div className={classes.paymentForm}>
            <div className={classes.inputForm}>

              <h3 className={classes.inputTitle}>Разом до сплати</h3>
              <button>Замовлення підтверджую</button>
            </div>
          </div>
        </div>

      </form>
    </div>
  )
}

export default CheckoutPage