import React from "react";
import classes from "./ErrorModal.module.scss";


interface ErrorModalProps {
    message: string[];
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
    return (
        <div className={classes.overlay} >

            <div className={classes.container}>
                <div className={classes.modalContent}>
                    {
                        message.map((message, index) => (

                            <h3 key={index} className={classes.errorMessage}>{message}</h3>
                        ))
                    }
                    <button className={classes["confirm-button"]} onClick={onClose}>Зрозуміло</button>
                </div>
            </div>
        </div>
    );
}

export default ErrorModal;