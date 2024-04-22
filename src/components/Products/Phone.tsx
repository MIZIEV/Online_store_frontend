import React, { useEffect, useState } from "react";
import classes from "./Phone.module.scss"
import { useParams } from "react-router";
import { getOnePhone } from "../../utils/phoneService";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import Rating from "../../UI/Rating/Rating";

const Phone: React.FC = () => {

    const { id } = useParams();
    const [phone, setPhone] = useState(null);


    useEffect(() => {
        getPhone();
    }, [])


    function getPhone() {
        getOnePhone(parseInt(id)).then((response) => {

            console.log("function in component")
            console.log(response);
            setPhone(response);
        }).catch((error) => {
            console.error(error);
        })
    }




    return (
        <>
            {phone ? (
                <div className={classes.container}>

                    <BreadCrumb items={[{ path: "/", title: "Головна/" }, { path: "/", title: "телефони/" }, { path: `/phone/${phone.id}`, title: `${phone.model}` }]} />

                    <div className={classes.topInfoBlock}>
                        <div className={classes.leftImagesBlock}>

                            <div className={classes.mainImage}>
                                mainImage
                            </div>

                            <div className={classes.additionImagePanel}>
                                <div className={classes.additionImagesContainer}>
                                    <div className={classes.additionImages}>addition image</div>
                                    <div className={classes.additionImages}>addition image</div>
                                    <div className={classes.additionImages}>addition image</div>
                                    <div className={classes.additionImages}>addition image</div>
                                    <div className={classes.additionImages}>addition image</div>
                                    <div className={classes.additionImages}>addition image</div>
                                    <div className={classes.additionImages}>addition image</div>
                                    <div className={classes.additionImages}>addition image</div>
                                    <div className={classes.additionImages}>addition image</div>
                                </div>
                            </div>

                        </div>

                        <div className={classes.rightImagesBlock}>

                            <h2>{phone.brand + " " + phone.model}</h2>
                            <p>Код товару: {phone.id}</p>

                            <div className={classes.ratingBlock}>
                                <Rating rating={Number(phone.rating)} />
                                <p className={classes.voteCount}>{phone.voteCount} відгуків</p>
                            </div>
                            <h2 className={classes.price}>{phone.price} грн.</h2>

                            <div className={classes.colorBlock}>
                                <p>Колір: </p>
                                <div className={classes.colorItems}>

                                    <div className={classes.colorItem}>c</div>
                                    <div className={classes.colorItem}>c</div>
                                    <div className={classes.colorItem}>c</div>

                                </div>
                            </div>

                            <div className={classes.romBlock}>
                                <p>Обсяг пам'яті: </p>
                                <div className={classes.romItems}>

                                    <span className={classes.romItem}>128 Гб</span>
                                    <span className={classes.romItem}>64 Гб</span>

                                </div>
                            </div>

                            <div className={classes.countBlock}>
                                <div className={classes.countImage}>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 12H16" stroke="black" stroke-linecap="round" />
                                    </svg>
                                </div>

                                <div className={classes.count}>1</div>

                                <div className={classes.countImage}>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 8V16" stroke="black" stroke-linecap="round" />
                                        <path d="M8 12H16" stroke="black" stroke-linecap="round" />
                                    </svg>
                                </div>
                            </div>

                            <div className={classes.buttonsBlock}>
                                <button className={classes.buyButton}>Купити</button>
                                <button className={classes.addToFavorite}>Додати в обране</button>
                            </div>

                        </div>


                    </div>
                </div>
            ) : (
                <h3>Error</h3>
            )}
        </>

    )
}

export default Phone;