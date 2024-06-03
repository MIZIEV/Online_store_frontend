import React from 'react';
import { Modal } from '@mui/material';
import classes from "./Confirmmodal.module.scss"

interface ConfirmModalProps {
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
    orderData: any;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, handleClose, handleConfirm, orderData }) => {

    const deliveryConverter = (deliveryMethod: string) => {
        if (deliveryMethod === "COURIER") {
            return "Доставка кур'єром"
        } else if (deliveryMethod === "NEW_POST_OFFICE") {
            return "У відділення Нової пошти";
        } else if (deliveryMethod === "NEW_POST_COURIER") {
            return "Доставка кур'єром Нової пошти";
        }
    }

    const paymentConverter = (paymentMethod: string) => {
        if (paymentMethod === "ONLINE") {
            return "Онлайн"
        } else if (paymentMethod === "CASH") {
            return "Готівкою при отриманні";
        }
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <div className={classes.container}>
                <h2 >
                    Підтвердіть ваше замовлення
                </h2>
                <label>
                    Прізвище, ім'я, по батькові: {orderData.fullName}
                </label>
                <label>
                    Номер телефону: {orderData.phoneNumber}
                </label>
                <label>
                    Місто: {orderData.city}
                </label>
                <label>
                    Спосіб доставки: {deliveryConverter(orderData.deliveryMethod)}
                </label>
                <label>
                    Метод оплати: {paymentConverter(orderData.paymentMethod)}
                </label>
                <label>
                    До сплати: {orderData.totalAmount} грн
                </label>

                <div className={classes.buttonBlock}>
                    <button className={classes.confirmButton} onClick={handleConfirm}>Підтверджую</button>
                    <button className={classes.cancelButton} onClick={handleClose} >Відміна</button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;