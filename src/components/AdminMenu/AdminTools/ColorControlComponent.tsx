import React, { useEffect, useState } from "react";
import { addNewColor, getAllColors } from "../../../utils/ColorService";
import classes from "./ColorControlComponent.module.scss"
import { GetColorName } from "hex-color-to-color-name";
import { Color } from "../../../shared.types";


const ColorControleComponent: React.FC = () => {

    const [data, setData] = useState<Color[]>([]);
    const [colorName, setColorName] = useState("");

    useEffect(() => {
        getAllColors().then((response) => {
            setData(response);
        }).catch(error => console.error(error));
    }, [])

    const converteColorCodeToColorName = (colorCode: string) => {
        colorCode = colorCode.replace(/^#/, '');
        const colorName = GetColorName(colorCode);
        return colorName ? colorName : "Unknown color code"
    }

    const handleNewColor = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        try {
            await addNewColor(formData as string);
            const updatedColors = await getAllColors();
            setData(updatedColors);
            setColorName("");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={classes.container}>
            <h1>Курування кольорами</h1>

            <div className={classes.subscribeBlock}>

                <div className={classes.iconBlock}>
                    <svg width="80" height="80" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1222_37591)">
                            <path d="M6.13293 12.0564C4.60293 13.5964 2.00293 14.1064 0.50293 12.5664C2.50293 10.4964 0.50293 9.49641 2.00293 7.99641C2.26632 7.70302 2.58676 7.46641 2.94469 7.30106C3.30261 7.1357 3.69049 7.04507 4.08463 7.0347C4.47877 7.02432 4.87089 7.09443 5.23701 7.24073C5.60314 7.38703 5.93559 7.60645 6.21404 7.88559C6.49249 8.16472 6.7111 8.4977 6.85651 8.86419C7.00192 9.23067 7.07106 9.62295 7.05973 10.0171C7.04839 10.4112 6.95681 10.7988 6.79058 11.1564C6.62435 11.5139 6.38697 11.8337 6.09293 12.0964L6.13293 12.0564Z" stroke="#0d0c0c" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4.698 7.08246L10.0029 1.16619C10.757 0.318496 12.1181 0.27653 12.9229 1.07619C13.723 1.88104 13.6809 3.24222 12.8329 3.99619L6.97627 9.24051" stroke="#0d0c0c" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1222_37591">
                                <rect width="80" height="80" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>

                <div className={classes.textBlock}>
                    <h4 className={classes.topText}>Додати новий колір</h4>
                    <h5 className={classes.bottomText}>у шіснадцятковому форматі, приклад #fffff4</h5>
                </div>

                <div className={classes.inputBlock}>
                    <form onSubmit={handleNewColor}>
                        <input
                            value={colorName}
                            onChange={(e) => setColorName(e.target.value)}
                            type="text"
                            name="colorName"
                            placeholder="Введіть код" />
                        <button type="submit">
                            Додати
                            <svg width="20" height="21" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12.5H19" stroke="#F7F8FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 5.5L19 12.5L12 19.5" stroke="#F7F8FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>

            <div className={classes.colorContainer}>
                {
                    data.map((color: Color) => (
                        <div key={color.id} className={classes.colorCard}>
                            <div className={classes.textBlock}>
                                <h4>{converteColorCodeToColorName(color.colorName)}</h4>
                                <h5>{color.colorName}</h5>
                            </div>
                            <div style={{ backgroundColor: color.colorName }} className={classes.colorBlock}>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default ColorControleComponent;