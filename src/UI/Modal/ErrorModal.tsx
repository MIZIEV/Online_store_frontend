import React from "react";
import classes from "./ErrorModal.module.scss";


interface ErrorModalProps {
    message: string;
    onClose: () => void;
}
 
const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
    return (
        <div className={classes.container}>
            <div className={classes.modalContent}>
                <h3 className={classes.errorMessage}>{message}</h3>
                <button className={classes["confirm-button"]} onClick={onClose}>Зрозуміло</button>
            </div>
        </div>
    );
}

export default ErrorModal;