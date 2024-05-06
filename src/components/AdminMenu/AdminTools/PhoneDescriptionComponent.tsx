import React, { useEffect, useState } from "react";
import classes from "./PhoneDescriptionComponent.module.scss";
import { addNewDescription, getDescriptions } from "../../../utils/descriptionService";
import { useParams } from "react-router";

const PhoneDescriptionComponent: React.FC = () => {

    const [descriptionText, setDescriptionText] = useState("");
    const [descriptionList, setDescriptionList] = useState([]);
    const { phoneId } = useParams();

    useEffect(() => {
        getDescriptions(phoneId)
            .then((response) => {
                setDescriptionList(response)
            })
            .catch((error) => console.error(error))
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        try {
            addNewDescription(phoneId, formData);
            const updatedDescriptionList = await getDescriptions(phoneId);
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
                            <li className={classes.descriptionItem} key={description.id}>{description.descriptionText}</li>
                        ))}
                    </ol>
                ) : (<div>error</div>)}


            </div>
        </div>
    )
}

export default PhoneDescriptionComponent;