import React from "react";
import classes from "./OrderHistory.module.scss";
import { useNavigate } from "react-router";


const OrderHistory: React.FC = () => {
    const navigator = useNavigate();

    const onClickButtonHandler = () => {
        navigator("/phone/catalog")
    }

    return (
        <div className={classes.container}>
            <h2>Історія замовлень</h2>
            <p>Історія замовлень порожня. Почніть з першого замовлення в роділі Бестселери</p>
            <button onClick={onClickButtonHandler}>До покупок</button>
        </div>
    )
}

export default OrderHistory;