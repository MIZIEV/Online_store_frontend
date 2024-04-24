import React, { useEffect, useState } from "react";
import classes from "./DescriptionComponent.module.scss";
import { getDescriptions } from "../../../utils/descriptionService";

const DescriptionComponent: React.FC = (props) => {

    const phoneId = props.phoneId;
    const [descriptionList, setDescriptionList] = useState([]);

    useEffect(() => {
        getDescriptionList();
    }, []);

    function getDescriptionList() {
        getDescriptions(phoneId).then((response) => {
            setDescriptionList(response);
        }).catch(error => console.error(error));
    }


    return (
        <>
            <div className={classes.container}>
                {descriptionList ? (
                    <ol>
                        {descriptionList.map((description) => (
                            <li key={description.id}>{description.descriptionText}</li>
                        ))}
                    </ol>
                ) : (<div>error</div>)}

            </div>
        </>
    )
}

export default DescriptionComponent;