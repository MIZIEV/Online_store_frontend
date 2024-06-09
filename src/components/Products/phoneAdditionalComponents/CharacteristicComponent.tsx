import React, { useEffect, useState } from "react";
import classes from "./CharacteristicComponent.module.scss";
import { getAllPhoneFeatures } from "../../../utils/FeaturesService";
import { PhoneFeature } from "../../../shared.types";

const CharacteristicComponent: React.FC = (props) => {

    const phoneCharacteristic = props.phone;
    const [phoneFeatures, setPhoneFeatures] = useState<PhoneFeature[]>([]);

    useEffect(() => {
        getAllPhoneFeatures(Number(props.phone.id)).then((response) => {
            setPhoneFeatures(response);
        })
    })

    return (
        <div className={classes.container}>

            <div className={classes.textRow}>
                <span>Операційна система</span>
                <span>{phoneCharacteristic.os}</span>
            </div>
            <div className={classes.textRow}>
                <span>Вурсія ос</span>
                <span>{phoneCharacteristic.osVersion}</span>
            </div>

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
                <span>Розподільна здатність</span>
                <span>{phoneCharacteristic.resolution}</span>
            </div>

            <div className={classes.textRow}>
                <span>Країна виробник</span>
                <span>{phoneCharacteristic.producingCountry}</span>
            </div>

            <div className={classes.textRow}>
                <span>Модель центрального процесора</span>
                <span>{phoneCharacteristic.processor}</span>
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
                <span>Фронтальна камера</span>
                <span>{`${phoneCharacteristic.frontCamera} Мп`}</span>
            </div>

            <div className={classes.textRow}>
                <span>Особливості</span>
                <div style={{ display: "block", textAlign: "right" }}>
                    {
                        phoneFeatures.map((feature) => (
                            <span key={feature.id} style={{ display: "block", padding: "5px 0px" }} >
                                {`${feature.feature},`}
                            </span>
                        ))
                    }
                </div>
            </div>

            <div className={classes.textRow}>
                <span>Вага</span>
                <span>{`${phoneCharacteristic.weight} гр`}</span>
            </div>

            <div className={classes.textRow}>
                <span>Ємність акумулятора мА/год</span>
                <span>{phoneCharacteristic.batteryCapacity}</span>
            </div>

        </div>
    )
};

export default CharacteristicComponent;