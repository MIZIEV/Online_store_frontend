import React from "react";
import classes from "./NotificationModal.module.scss";

const NotificationModal: React.FC<{ message: string, onClose: () => void, onConfirm: () => void }> = (props) => {

    const { message, onClose, onConfirm } = props;

    return (
        <div className={classes.overlay}>
            <div className={classes.container}>
                <div className={classes.modalContent}>
                    <h3 className={classes.errorMessage}>{message}</h3>
                    <button className={classes["confirm-button"]} onClick={onConfirm}>Підтверджую</button>
                    <button className={classes["cancel-button"]} onClick={onClose}>Скасувати</button>
                </div>
            </div>
        </div>
    );
}


export default NotificationModal;