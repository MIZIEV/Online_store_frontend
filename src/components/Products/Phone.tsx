import React, { useEffect, useState } from "react";
import classes from "./Phone.module.scss"
import { GetColorName } from 'hex-color-to-color-name';

import { useParams } from "react-router";
import { getOnePhone } from "../../utils/phoneService";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import RatingComponent from "../../UI/Rating/RatingComponent";
import DescriptionComponent from "./phoneAdditionalComponents/DescriptionComponent";
import CharacteristicComponent from "./phoneAdditionalComponents/CharacteristicComponent";

interface phoneCharacteristic {
    id: number,
    mainPictureURL: string,
    brand: string,
    model: string,
    rating: number,
    voteCount: number,
    price: number,
    os: string,
    osVersion: number,
    screenSize: number,
    resolution: string,
    mainCamera: string,
    frontCamera: number,
    processor: string,
    countOfCores: number,
    ram: number,
    weight: number,
    batteryCapacity: number,
    countOfSimCard: number,
    colors: Color[],
    romList: Rom[],
    phonePictureUrls: PictureUrl[]
}

interface Color {
    id: number,
    colorName: string
}

interface PictureUrl {
    id: number,
    url: string
}

interface Rom {
    id: number,
    romSize: number
}

interface PageState {
    selectedOption: string;
}

const Phone: React.FC = () => {

    const { id } = useParams();
    const [phone, setPhone] = useState<phoneCharacteristic>();
    const [selectedColor, setSelectedColor] = useState<number | null>(null);
    const [selectedRom, setSelectedRom] = useState<number | null>(null);

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

    const handleColorChange = (colorId: number) => {
        setSelectedColor(colorId);
    };

    const converteColorCodeToColorName = (colorCode: string) => {
        colorCode = colorCode.replace(/^#/, '');
        const colorName = GetColorName(colorCode);
        return colorName ? colorName : "Unknown color code"
    }

    const handleRomChange = (romId: number) => {
        setSelectedRom(romId);
    };



    return (
        <>
            {phone ? (
                <div className={classes.container}>

                    <BreadCrumb items={[{ path: "/", title: "Головна/" }, { path: "/", title: "телефони/" }, { path: `/phone/${phone.id}`, title: `${phone.model}` }]} />

                    <div className={classes.topInfoBlock}>
                        <div className={classes.leftImagesBlock}>

                            <div className={classes.mainImage}>
                                <img src={phone.mainPictureURL} alt="Main picture" />
                            </div>

                            <div className={classes.additionImagePanel}>
                                <div className={classes.additionImagesContainer}>

                                    {phone.phonePictureUrls.map((pictureUrl) => (

                                        <div className={classes.additionImages} key={pictureUrl.id}>
                                            <img src={pictureUrl.url} alt="additional picture" />
                                        </div>

                                    ))}

                                </div>
                            </div>

                        </div>

                        <div className={classes.rightImagesBlock}>

                            <h2>{phone.brand + " " + phone.model}</h2>
                            <p>Код товару: {phone.id}</p>
                            {/*--------------------------------rating functional----------------------------------- */}
                            <div className={classes.ratingBlock}>
                                <RatingComponent phoneId={id} rating={phone.rating} />
                                <p className={classes.voteCount}>{phone.voteCount} відгуків</p>
                            </div>
                            <h2 className={classes.price}>{phone.price} грн.</h2>
                            {/*---------------------------------color functional------------------------------------*/}
                            <div className={classes.colorBlock}>
                                <p>Колір: {selectedColor !== null ?
                                    converteColorCodeToColorName(phone.colors.find(color => color.id === selectedColor)?.colorName) : 'Колір не обраний'}</p>

                                <div className={classes.colorItems}>
                                    {phone.colors.map((color) => (

                                        <div key={color.id}
                                            style={{ backgroundColor: color.colorName }}
                                            onClick={() => handleColorChange(color.id)}
                                            className={`${classes.colorItem} ${selectedColor === color.id ? classes.selected : ''}`}>

                                            <input
                                                className={classes.colorRadioButton}
                                                type="radio"
                                                id={`color-${color.id}`}
                                                name="phoneColor"
                                                checked={selectedColor === color.id}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/*---------------------------------rom functional---------------------------------------*/}
                            <div className={classes.romBlock}>

                                <p>Обсяг пам'яті: {selectedRom !== null ?
                                    phone.romList.find(rom => rom.id === selectedRom)?.romSize : "Об'єм пам'яті не обрано "}</p>

                                <div className={classes.romItems}>
                                    {phone.romList.map((rom) => (

                                        <div key={rom.id}
                                            onClick={() => handleRomChange(rom.id)}
                                            className={`${classes.romItem} ${selectedRom === rom.id ? classes.selected : ''}`}>

                                            <input
                                                className={classes.romRadioButton}
                                                type="radio"
                                                id={`rom-${rom.id}`}
                                                name="phoneRom"
                                                checked={selectedRom === rom.id}
                                            />
                                            {rom.romSize} Гб
                                        </div>
                                    ))}

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
                                {pageState.selectedOption === 'option2' && <CharacteristicComponent phone={phone} />}
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