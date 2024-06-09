import React, { useEffect, useState } from "react";
import classes from "./FeaturesManagment.module.scss";
import { addNewPhoneFeature, deleteFeature, getAllPhoneFeatures } from "../../../utils/FeaturesService";
import { useParams } from "react-router";
import { PhoneFeature } from "../../../shared.types";

const FeaturesManagment: React.FC = () => {

    const [feature, setFeature] = useState<string>("");
    const [featureList, setFeatureList] = useState<PhoneFeature[]>([]);
    const { phoneId } = useParams();

    useEffect(() => {
        getAllPhoneFeatures(Number(phoneId)).then((response) => {
            setFeatureList(response)
        })
    }, [])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newFeature: PhoneFeature = {
            id: 0,
            feature: feature
        }
        await addNewPhoneFeature(newFeature, Number(phoneId))

        const updatedFeatureList = await getAllPhoneFeatures(Number(phoneId));
        setFeatureList(updatedFeatureList);
        setFeature("")
    }

    const deleteFeatureHandler = async (featureId: number) => {
        try {
            await deleteFeature(Number(phoneId), featureId);
            const updatedFeatureList = await getAllPhoneFeatures(Number(phoneId));
            setFeatureList(updatedFeatureList)
            setFeature("");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={classes.container}>
            <h1>Додаткові особливосіт смартфона</h1>
            <form onSubmit={handleSubmit}>
                <div className={classes.textAreaBlock}>
                    <textarea name="feaature" value={feature} onChange={e => setFeature(e.target.value)} />
                    <button type="submit">Зберегти</button>
                </div>
            </form>

            <div className={classes.featureListBlock}>
                {featureList ? (
                    <ol>
                        {featureList.map((feature) => (

                            <li className={classes.featureItem} key={feature.id}>
                                <div className={classes.featureText}>
                                    {feature.feature}
                                </div>

                                <svg onClick={() => deleteFeatureHandler(feature.id)} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default FeaturesManagment;