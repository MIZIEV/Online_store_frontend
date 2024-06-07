import React from "react";
import classes from "./PaymentBlockComponent.module.scss";

const PaymentBlockComponent: React.FC = () => {

    return (
        <div className={classes.container}>
            <div className={classes.topBlock}>
                <label>Номер картки</label>
                <input className={classes.paymentInput} placeholder="**** **** **** ****" type="text" />
            </div>

            <div className={classes.middleBlock}>
                <div className={classes.leftSide}>
                    <label>Термін дії</label>
                    <input className={classes.paymentInput} placeholder="MM/YY" type="text" />
                </div>

                <div className={classes.rightSide}>
                    <label>CVV2</label>
                    <input className={classes.paymentInput} placeholder="***" type="text" />
                </div>

            </div>

            <div className={classes.bottomBlock}>
                <p>Натискаючи кнопку "Сплатити", ВИ прийймаєте Угоду користувача</p>
                <button>Сплатити</button>
            </div>
        </div>
    )
}

export default PaymentBlockComponent;