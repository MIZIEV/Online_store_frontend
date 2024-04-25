import React from "react";
import classes from "./CharacteristicComponent.module.scss";

const CharacteristicComponent: React.FC = () => {
    return (
        <>
            <div className={classes.container}>
                <div className={classes.textRow}>
                    <span>Стандарт мобільного зв'язку</span>
                    <span>value</span>
                </div>
                <div className={classes.textRow}>
                    <span>Кількість SIM-карт</span>
                    <span>value</span>
                </div>
                <div className={classes.textRow}>
                    <span>Діагональ екрана</span>
                    <span>value</span>
                </div>
                <div className={classes.textRow}>
                    <span>Виробник процесора</span>
                    <span>value</span>
                </div>
                <div className={classes.textRow}>
                    <span>Модель центрального процесора</span>
                    <span>value</span>
                </div>
                <div className={classes.textRow}>
                    <span>Внутрішня пам'ять</span>
                    <span>value</span>
                </div>
                <div className={classes.textRow}>
                    <span>Оперативна пам'ять</span>
                    <span>value</span>
                </div>
                <div className={classes.textRow}>
                    <span>Основна камера</span>
                    <span>value</span>
                </div>
                <div className={classes.textRow}>
                    <span>Світосила основної камери</span>
                    <span>value</span>
                </div>
                <div className={classes.textRow}>
                    <span>Фронтальна камера</span>
                    <span>value</span>
                </div>
                <div className={classes.textRow}>
                    <span>Ємність акумулятора мА/год</span>
                    <span>value</span>
                </div>
                <div className={classes.textRow}>
                    <span>Операційна система</span>
                    <span>value</span>
                </div>
                <div className={classes.textRow}>
                    <span>Основний ітерфейс</span>
                    <span>value</span>
                </div>
            </div>
        </>
    )
};

export default CharacteristicComponent;