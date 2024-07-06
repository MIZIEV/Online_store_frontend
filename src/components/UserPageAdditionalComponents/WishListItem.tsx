import React from "react";
import classes from "./WishListItem.module.scss";
import { deletePhoneFromWishList } from "../../utils/phoneService";
import { Phone } from "../../shared.types";

interface WishListItemProps {
    phone: Phone;
    onDelete: (phoneId: number) => void;
}

const WishListItem: React.FC<WishListItemProps> = (props) => {

    const { phone, onDelete } = props;
    const email = localStorage.getItem("authenticatedEmail");


    const onClickDeleteHandler = () => {
        deletePhoneFromWishList(phone.id, email);
        onDelete(phone.id);
    }

    return (
        <div className={classes.container}>

            <p>{phone.brand}</p>
            <p>{phone.model}</p>
            <p>{`ціна - ${phone.price} ₴`}</p>
            <svg onClick={onClickDeleteHandler} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M42 8H32C32 5.794 30.206 4 28 4H20C17.794 4 16 5.794 16 8H6V12H42V8Z" />
                <path d="M22 36H18V16H10V40.286C10 42.334 11.794 44 14 44H34C36.206 44 38 42.334 38 40.286V16H30V36H26V16H22V36Z" />
            </svg>
        </div>
    )
}

export default WishListItem;