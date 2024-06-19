import React, { useEffect, useState } from "react";
import classes from "./PhoneDescriptionComponent.module.scss";
import { addNewDescription, deleteDescription, getDescriptions } from "../../../utils/descriptionService";
import { useParams } from "react-router";
import { addNewAdditionalPicture, deleteAdditionalPicture, getAllAdditionPictures } from "../../../utils/AdditionalPictureService";
import ErrorModal from "../../../UI/Modal/ErrorModal";
import { isValidUrl } from "../../../utils/Validator";

interface PhoneDescription {
    ind: number,
    descriptionText: string
}

const PhoneDescriptionComponent: React.FC = () => {

    const [descriptionText, setDescriptionText] = useState("");
    const [descriptionList, setDescriptionList] = useState<PhoneDescription[]>([]);
    const { phoneId } = useParams();
    const [pictureUrl, setPictureUrl] = useState<string>("");
    const [picturesList, setPicturesList] = useState([]);

    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    useEffect(() => {
        getDescriptions(Number(phoneId))
            .then((response) => {
                setDescriptionList(response)
            })
            .catch((error) => console.error(error))
    }, [])

    useEffect(() => {
        getAllAdditionPictures(Number(phoneId)).then((response) => {
            setPicturesList(response)
        })
    }, [])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (descriptionText.length < 10 || descriptionText.length > 2000) {
            setIsError(true);
            errorMessages.push("Розмір тексту повинен бути в діапазоні від 10 до 2000 символів!");
            setErrorMessages(errorMessages);
            return;
        }
        const formData = new FormData(e.target as HTMLFormElement);

        try {
            await addNewDescription(Number(phoneId), formData);
            const updatedDescriptionList = await getDescriptions(Number(phoneId));
            setDescriptionList(updatedDescriptionList)
            setDescriptionText("");
        } catch (error) {
            console.error(error);
        }
    }

    const deleteDescriptionText = async (descriptionId: number) => {

        try {
            await deleteDescription(Number(phoneId), descriptionId);
            const updatedDescriptionList = await getDescriptions(Number(phoneId));
            setDescriptionList(updatedDescriptionList)
            setDescriptionText("");
        } catch (error) {
            console.error(error);
        }
    }

    const handleNewAdditionalPcture = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isValidUrl(pictureUrl)) {
            setIsError(true);
            errorMessages.push("Не коректна URL картинки!");
            setErrorMessages(errorMessages);
            return;
        }

        const formData = new FormData(e.target as HTMLFormElement);

        await addNewAdditionalPicture(Number(phoneId), formData as string)
        const updatedPictureList = await getAllAdditionPictures(Number(phoneId));
        setPicturesList(updatedPictureList)
        setPictureUrl("");
    }

    const handleDeletePicture = async (pictureId: number) => {

        try {
            await deleteAdditionalPicture(Number(phoneId), pictureId);
            const updatedPictureList = await getAllAdditionPictures(Number(phoneId));
            setPicturesList(updatedPictureList)
        } catch (error) {
            console.error(error);
        }
    };

    const closeErroModalHandler = () => {
        setIsError(false);
        setErrorMessages([]);
    };

    return (
        <div className={classes.container}>

            {isError && <ErrorModal message={errorMessages} onClose={closeErroModalHandler} />}

            <h1>Додаткова інформація для смартфона</h1>

            <form onSubmit={handleSubmit}>
                <div className={classes.textAreaBlock}>
                    <textarea name="descriptionText" value={descriptionText} onChange={e => setDescriptionText(e.target.value)} />
                    <button type="submit">Зберегти</button>
                </div>
            </form>

            <div className={classes.descriptionListBlock}>
                {descriptionList ? (
                    <ol>
                        {descriptionList.map((description) => (

                            <li className={classes.descriptionItem} key={description.id}>
                                <div className={classes.descriptionText}>
                                    {description.descriptionText}
                                </div>

                                <svg onClick={() => deleteDescriptionText(description.id)} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M42 8H32C32 5.794 30.206 4 28 4H20C17.794 4 16 5.794 16 8H6V12H42V8Z" />
                                    <path d="M22 36H18V16H10V40.286C10 42.334 11.794 44 14 44H34C36.206 44 38 42.334 38 40.286V16H30V36H26V16H22V36Z" />
                                </svg>
                            </li>

                        ))}
                    </ol>
                ) : (<div>error</div>)}
            </div>


            <div className={classes.subscribeBlock}>
                <div className={classes.iconBlock}>
                    <svg width="80" height="80" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1222_36459)">
                            <path d="M9.5 3.5H1.5C0.947715 3.5 0.5 3.94772 0.5 4.5V12.5C0.5 13.0523 0.947715 13.5 1.5 13.5H9.5C10.0523 13.5 10.5 13.0523 10.5 12.5V4.5C10.5 3.94772 10.0523 3.5 9.5 3.5Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M3.5 0.5H12.5C12.7652 0.5 13.0196 0.605357 13.2071 0.792893C13.3946 0.98043 13.5 1.23478 13.5 1.5V10.5" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5.5 6V11" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8 8.5H3" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1222_36459">
                                <rect width="14" height="14" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>

                <div className={classes.textBlock}>
                    <h4 className={classes.topText}>Додати нові фото смартфону</h4>
                    <h5 className={classes.bottomText}>у форматі url посилання на картинку</h5>
                </div>

                <div className={classes.inputBlock}>
                    <form onSubmit={handleNewAdditionalPcture}>
                        <input
                            value={pictureUrl}
                            onChange={(e) => setPictureUrl(e.target.value)}
                            type="text"
                            name="url"
                            placeholder="Введіть url картинки" />
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

            <div className={classes.picturesContainer}>
                {
                    picturesList.map((picture) => (
                        <div key={picture.id} className={classes.imageCard}>
                            <div className={classes.image}>
                                <img src={picture.url} />
                            </div>

                            <div className={classes.bottomBlock}>
                                <div className={classes.icon}>
                                    <svg onClick={() => handleDeletePicture(picture.id)} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M42 8H32C32 5.794 30.206 4 28 4H20C17.794 4 16 5.794 16 8H6V12H42V8Z" />
                                        <path d="M22 36H18V16H10V40.286C10 42.334 11.794 44 14 44H34C36.206 44 38 42.334 38 40.286V16H30V36H26V16H22V36Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PhoneDescriptionComponent;