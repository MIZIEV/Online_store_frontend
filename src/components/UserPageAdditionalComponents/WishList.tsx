import React, { useEffect, useState } from "react"
import { Phone } from "../../shared.types";
import { getWishListForUser } from "../../utils/UserService";
import WishListItem from "./WishListItem";
import classes from "./WishList.module.scss"
import { useNavigate } from "react-router";

const WishList: React.FC = () => {

    const [wishList, setWishList] = useState<Phone[]>([])
    const email = localStorage.getItem("authenticatedEmail");
    const navigator = useNavigate();

    useEffect(() => {

        getWishListForUser(email as string).then((response) => {
            setWishList(response);
        })
    }, [])

    const deletePhoneHandler = (phoneId: number) => {
        setWishList((prevWishList) => prevWishList.filter((phone) => phone.id !== phoneId));
    };

    const onClickButtonHandler = () => {
        navigator("/phone/catalog")
    }

    return (
        <div className={classes.container}>
            {
                wishList && wishList.length > 0 ? (

                    wishList.map((phone) => (
                        <WishListItem key={phone.id} phone={phone} onDelete={deletePhoneHandler} />
                    ))
                ) : (
                    <div>
                        <h2>Список бажань</h2>
                        <p>Список бажань порожній. Можете обрати до цього списку смартфон із каталогу.</p>
                        <button onClick={onClickButtonHandler}>Каталог смартфонів</button>
                    </div>
                )
            }
        </div>
    )
}

export default WishList;