import React, { useEffect, useState } from "react";
import classes from "./PhoneDescriptionComponent.module.scss";
import { addNewDescription, deleteDescription, getDescriptions } from "../../../utils/descriptionService";
import { useParams } from "react-router";

interface PhoneDescription {
    ind: number,
    descriptionText: string
}

const PhoneDescriptionComponent: React.FC = () => {

    const [descriptionText, setDescriptionText] = useState("");
    const [descriptionList, setDescriptionList] = useState<PhoneDescription[]>([]);
    const { phoneId } = useParams();

    useEffect(() => {
        getDescriptions(Number(phoneId))
            .then((response) => {
                setDescriptionList(response)
            })
            .catch((error) => console.error(error))
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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


    return (
        <div className={classes.container}>
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
        </div>
    )
}

export default PhoneDescriptionComponent;