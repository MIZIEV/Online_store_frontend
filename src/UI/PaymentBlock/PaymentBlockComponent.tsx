import React, { useState } from "react";
import classes from "./PaymentBlockComponent.module.scss";
import ErrorModal from "../Modal/ErrorModal";
import { validateCVV, validateCardNumber, validateExpirationDate } from "../../utils/Validator";

const PaymentBlockComponent: React.FC = () => {

    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const [creditCard, setCreditCard] = useState<string>("");
    const [cardExpiration, setCardExpiration] = useState<string>("");
    const [cvv, setCvv] = useState<string>("");

    const closeModalHandler = () => {
        setErrorMessages([])
        setIsError(false);
    }

    const paymentHandler = () => {

        if (!validateCardNumber(creditCard)) {
            errorMessages.push("Не коррекний номер картки!")
        }
        if (!validateExpirationDate(cardExpiration)) {
            errorMessages.push("Не коррекний термін придатності картки!")
        }
        if (!validateCVV(cvv)) {
            errorMessages.push("Не коррекний CVV код картки!")
        }

        if (errorMessages.length > 0) {
            setErrorMessages(errorMessages);
            setIsError(true);
        }

    }

    return (
        <div className={classes.container}>

            {isError && <ErrorModal message={errorMessages} onClose={closeModalHandler} />}

            <div className={classes.topBlock}>
                <label>Номер картки</label>
                <input
                    onChange={e => setCreditCard(e.target.value)}
                    className={classes.paymentInput}
                    placeholder="**** **** **** ****"
                    type="text" />
            </div>

            <div className={classes.middleBlock}>
                <div className={classes.leftSide}>
                    <label>Термін дії</label>
                    <input
                        onChange={e => setCardExpiration(e.target.value)}
                        className={classes.paymentInput}
                        placeholder="MM/YY"
                        type="text" />
                </div>

                <div className={classes.rightSide}>
                    <label>CVV2</label>
                    <input
                        onChange={e => setCvv(e.target.value)}
                        className={classes.paymentInput}
                        placeholder="***"
                        type="text" />
                </div>
            </div>

            <div className={classes.bottomBlock}>
                <p>Натискаючи кнопку "Сплатити", ВИ прийймаєте Угоду користувача</p>
                <button onClick={paymentHandler}>Сплатити</button>
            </div>
        </div>
    )
}

export default PaymentBlockComponent;