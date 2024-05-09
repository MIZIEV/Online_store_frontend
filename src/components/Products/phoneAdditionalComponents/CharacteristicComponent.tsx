import React from "react";
import classes from "./CharacteristicComponent.module.scss";


const CharacteristicComponent: React.FC = (props) => {

    const phoneCharacteristic = props.phone;


    return (
        <>
            <div className={classes.container}>
                <div className={classes.textRow}>
                    <span>Стандарт мобільного зв'язку</span>
                    <div style={{ display: "block", textAlign: "right" }}>
                        {
                            phoneCharacteristic.communicationStandardList.map((communicationStandard) => (
                                <span style={{ display: "block", padding: "5px 0px" }} >{communicationStandard.standardName}</span>
                            ))
                        }
                    </div>
                </div>
                <div className={classes.textRow}>
                    <span>Кількість SIM-карт</span>
                    <span>{phoneCharacteristic.countOfSimCard}</span>
                </div>
                <div className={classes.textRow}>
                    <span>Діагональ екрана</span>
                    <span>{phoneCharacteristic.screenSize}</span>
                </div>
                <div className={classes.textRow}>
                    <span>Виробник процесора</span>
                    <span>value</span>
                </div>
                <div className={classes.textRow}>
                    <span>Модель центрального процесора</span>
                    <span>{phoneCharacteristic.processor}</span>
                </div>
                <div className={classes.textRow}>
                    <span>Внутрішня пам'ять</span>
                    <span>{phoneCharacteristic.rom} Гб</span>
                </div>
                <div className={classes.textRow}>
                    <span>Оперативна пам'ять</span>
                    <span>{phoneCharacteristic.ram} Гб</span>
                </div>
                <div className={classes.textRow}>
                    <span>Основна камера</span>
                    <span>{phoneCharacteristic.mainCamera}</span>
                </div>
                <div className={classes.textRow}>
                    <span>Світосила основної камери</span>
                    <span>value</span>
                </div>
                <div className={classes.textRow}>
                    <span>Фронтальна камера</span>
                    <span>{phoneCharacteristic.frontCamera} Мп</span>
                </div>
                <div className={classes.textRow}>
                    <span>Ємність акумулятора мА/год</span>
                    <span>{phoneCharacteristic.batteryCapacity}</span>
                </div>
                <div className={classes.textRow}>
                    <span>Операційна система</span>
                    <span>{phoneCharacteristic.os}</span>
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