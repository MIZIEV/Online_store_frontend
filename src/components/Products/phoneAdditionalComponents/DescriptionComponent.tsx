import React, { useEffect, useState } from "react";
import classes from "./DescriptionComponent.module.scss";
import { getDescriptions } from "../../../utils/descriptionService";

interface Description {
    id: number,
    descriptionText: string
}

interface DescriptionComponentProps {
    phoneId: number
}

const DescriptionComponent: React.FC<DescriptionComponentProps> = (props) => {

    const phoneId = props.phoneId;
    const [descriptionList, setDescriptionList] = useState<Description[]>([]);

    useEffect(() => {
        getDescriptionList();
    }, []);

    function getDescriptionList() {
        getDescriptions(phoneId).then((response: Description[]) => {
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