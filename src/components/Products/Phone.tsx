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