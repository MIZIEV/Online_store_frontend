import React from "react";
import classes from "./TransferComponent.module.scss";
import { useNavigate } from "react-router";

const TransferComponent: React.FC = () => {

    const navigator = useNavigate();

    function handleToPhoneManagment() {
        navigator("/admin/phone-managment")
    }
    function handleToBlogManagment() {
        navigator("/blog-managment")
    }

    return (
        <div className={classes.container}>
            <div className={classes.buttonContainer}>
                <button onClick={handleToPhoneManagment}>Phone managment</button>
                <button onClick={handleToBlogManagment}>Blog managment</button>
            </div>
        </div>
    )
}

export default TransferComponent;