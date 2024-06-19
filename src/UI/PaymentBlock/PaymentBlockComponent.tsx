import React from "react";
import classes from "./PaymentBlockComponent.module.scss";

interface PaymentBlockProps {
    creditCard: string;
    setCreditCard: React.Dispatch<React.SetStateAction<string>>;
    cardExpiration: string;
    setCardExpiration: React.Dispatch<React.SetStateAction<string>>;
    cvv: string;
    setCvv: React.Dispatch<React.SetStateAction<string>>;
}

const formatCardNumber = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
};

const PaymentBlockComponent: React.FC<PaymentBlockProps> = ({
    creditCard,
    setCreditCard,
    cardExpiration,
    setCardExpiration,
    cvv,
    setCvv
}) => {

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatCardNumber(e.target.value);
        setCreditCard(formattedValue);
    };

    return (
        <div className={classes.container}>

            <div className={classes.topBlock}>
                <label>Номер картки</label>
                <input
                    value={creditCard}
                    onChange={handleCardNumberChange}
                    className={classes.paymentInput}
                    placeholder="**** **** **** ****"
                    type="text" />
            </div>

            <div className={classes.middleBlock}>
                <div className={classes.leftSide}>
                    <label>Термін дії</label>
                    <input
                        value={cardExpiration}
                        onChange={e => setCardExpiration(e.target.value)}
                        className={classes.paymentInput}
                        placeholder="MM/YY"
                        type="text" />
                </div>

                <div className={classes.rightSide}>
                    <label>CVV2</label>
                    <input
                        value={cvv}
                        onChange={e => setCvv(e.target.value)}
                        className={classes.paymentInput}
                        placeholder="***"
                        type="text" />
                </div>
            </div>

            <div className={classes.bottomBlock}>
                <p>Натискаючи кнопку "Сплатити", ВИ прийймаєте Угоду користувача</p>
                <button >Сплатити</button>
            </div>
        </div>
    )
}

export default PaymentBlockComponent;