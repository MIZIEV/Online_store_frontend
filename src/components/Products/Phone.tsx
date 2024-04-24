import React, { useEffect, useState } from "react";
import classes from "./Phone.module.scss"
import { useParams } from "react-router";
import { getOnePhone } from "../../utils/phoneService";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import Rating from "../../UI/Rating/Rating";
import DescriptionComponent from "./phoneAdditionalComponents/DescriptionComponent";
import CharacteristicComponent from "./phoneAdditionalComponents/CharacteristicComponent";

interface PageState {
    selectedOption: string;
}

const Phone: React.FC = () => {

    const { id } = useParams();
    const [phone, setPhone] = useState(null);

    const [pageState, setPageState] = useState<PageState>({
        selectedOption: 'option1' // первая кнопка выбрана по умолчанию
    });

    const handleOptionChange = (option: string) => {
        setPageState({ selectedOption: option });
    };
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
                    <div className={classes.bottomBlock}>
                        <div className={classes.radioButtonsBlock}>
                            <button className={pageState.selectedOption === 'option1' ? `${classes.selected}` : `${classes.RadioButton}`} onClick={() => handleOptionChange('option1')} disabled={pageState.selectedOption === 'option1'}>Опис</button>
                            <button className={pageState.selectedOption === 'option2' ? `${classes.selected}` : `${classes.RadioButton}`} onClick={() => handleOptionChange('option2')} disabled={pageState.selectedOption === 'option2'}>Характеристики</button>
                            <button className={pageState.selectedOption === 'option3' ? `${classes.selected}` : `${classes.RadioButton}`} onClick={() => handleOptionChange('option3')} disabled={pageState.selectedOption === 'option3'}>Відгуки</button>
                        </div>

                        {pageState.selectedOption && (
                            <div className={classes.bottomContent}>
                                {pageState.selectedOption === 'option1' && <DescriptionComponent phoneId={id} />}
                                {pageState.selectedOption === 'option2' && <CharacteristicComponent />}
                                {pageState.selectedOption === 'option3' && <div>Відгуки</div>}
                            </div>
                        )}
                    </div>

                </div>
            ) : (
                <h3>Error</h3>
            )}
        </>

    )
}

export default Phone;