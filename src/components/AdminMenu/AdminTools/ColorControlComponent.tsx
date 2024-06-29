import React, { useEffect, useState } from "react";
import { addNewColor, deleteColor, getAllColors, putTheColorsInPhone } from "../../../utils/ColorService";
import classes from "./ColorControlComponent.module.scss"
import { GetColorName } from "hex-color-to-color-name";
import { Color, Phone } from "../../../shared.types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CardProps } from "@mui/material";
import { getPhoneList } from "../../../utils/phoneService";
import ErrorModal from "../../../UI/Modal/ErrorModal";
import { isValidColor } from "../../../utils/Validator";
import { Outlet } from "react-router";

const columns: GridColDef[] = [

    { field: 'id', headerName: 'id', width: 70, headerClassName: classes.headerTable },
    { field: 'brand', headerName: 'Бренд', width: 130, },
    { field: 'model', headerName: 'Модель', width: 130 },
];

const ColorControleComponent: React.FC = () => {

    const [data, setData] = useState<Color[]>([]);
    const [phoneList, setPhoneList] = useState<Phone[]>([]);
    const [colorName, setColorName] = useState("");

    const [selectedColors, setSelectedColors] = useState<number[]>([]);
    const [selectedColorsDisplay, setSelectedColorsDisplay] = useState<number[]>([]);

    const [rows, setRows] = useState<CardProps[]>([]);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPhoneList();
                setPhoneList(data);
                setRows(data);
                console.log("data list of phons")
                console.log(data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [selectedColors])

    const handleRowSelection = (selection: string[]) => {
        setSelectedRows(selection);
        setSelectedColors([]);

        console.log(selection);

        const selectedPhones = selection.map(selectedId => {
            return phoneList.find(phone => phone.id === parseInt(selectedId));
        });

        const selectedColors = selectedPhones.flatMap(phone => {
            return phone ? phone.colors.map(color => color.id) : [];
        });

        setSelectedColorsDisplay(selectedColors);

        console.log(selectedPhones);
    };

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
        const formDataString = JSON.stringify(Object.fromEntries(formData.entries()));

        if (!isValidColor(colorName)) {
            setIsError(true);
            errorMessages.push("Некоректний формат кольору!")
            setErrorMessages(errorMessages);
            return;
        }

        try {
            await addNewColor(formDataString);
            const updatedColors = await getAllColors();
            setData(updatedColors);
            setColorName("");
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteColor = async (id: number) => {
        try {
            await deleteColor(id);
            const updatedColors = await getAllColors();
            setData(updatedColors);
        } catch (error) {
            console.error(error);
        }
    }

    const toggleCardSelection = (id: number) => {
        setSelectedColorsDisplay(prevSelectedColors => {
            if (prevSelectedColors.includes(id)) {
                return prevSelectedColors.filter(colorId => colorId !== id);
            } else {
                return [...prevSelectedColors, id];
            }
        });

        setSelectedColors(prevSelectedColors => {
            if (prevSelectedColors.includes(id)) {
                return prevSelectedColors.filter(colorId => colorId !== id);
            } else {
                return [...prevSelectedColors, id];
            }
        });
    }

    useEffect(() => {

        if (selectedRows && selectedColors.length > 0) {

            putTheColorsInPhone(selectedRows, selectedColors).then((response) => {
                console.log(response);
            })
            console.log(selectedColors);
        }
    }, [selectedColors]);

    const closeErroModalHandler = () => {
        setIsError(false);
        setErrorMessages([]);
    };

    return (
        <div className={classes.container}>

            <Outlet />

            {isError && <ErrorModal message={errorMessages} onClose={closeErroModalHandler} />}

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
                        <div
                            key={color.id}
                            onClick={() => toggleCardSelection(color.id)}
                            className={`${classes.colorCard} ${selectedColorsDisplay.includes(color.id) ? classes.selected : ""}`}>

                            <div className={classes.topBlock}>
                                <div className={classes.textBlock}>
                                    <h4>{converteColorCodeToColorName(color.colorName)}</h4>
                                    <h5>{color.colorName}</h5>
                                </div>

                                <div className={classes.iconBlock}>
                                    <svg onClick={() => handleDeleteColor(color.id)} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M42 8H32C32 5.794 30.206 4 28 4H20C17.794 4 16 5.794 16 8H6V12H42V8Z" fill="black" />
                                        <path d="M22 36H18V16H10V40.286C10 42.334 11.794 44 14 44H34C36.206 44 38 42.334 38 40.286V16H30V36H26V16H22V36Z" fill="black" />
                                    </svg>
                                </div>
                            </div>
                            <div style={{ backgroundColor: color.colorName }} className={classes.colorBlock}>
                            </div>
                        </div>
                    ))
                }

            </div>

            <div className={classes.tableContainer} style={{ height: 400, width: 'auto' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    onRowSelectionModelChange={handleRowSelection}
                    disableMultipleRowSelection={true}
                    sx={{
                        '& .MuiDataGrid-checkboxInput': {
                            color: '#12372a'
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default ColorControleComponent;