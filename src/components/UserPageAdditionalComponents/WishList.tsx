import React, { useEffect, useState } from "react"
import { Phone } from "../../shared.types";
import { getWishListForUser } from "../../utils/UserService";
import WishListItem from "./WishListItem";
import classes from "./WishList.module.scss"

const WishList: React.FC = () => {

    const [wishList, setWishList] = useState<Phone[]>([])
    const email = sessionStorage.getItem("authenticatedEmail");

    useEffect(() => {

        getWishListForUser(email).then((response) => {
            setWishList(response);
        })
    }, [])

    const deletePhoneHandler = (phoneId: number) => {
        setWishList((prevWishList) => prevWishList.filter((phone) => phone.id !== phoneId));
    };

    return (
        <div className={classes.container}>
            {
                wishList.map((phone) => (
                    <WishListItem key={phone.id} phone={phone} onDelete={deletePhoneHandler} />
                ))
            }
        </div>
    )
}

export default WishList;