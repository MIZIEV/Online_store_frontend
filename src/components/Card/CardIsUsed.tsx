import React, { useState } from "react";
import classes from "./CardIsUsed.module.scss";
import { Phone } from "../../shared.types";

const CardIsUsed: React.FC<Phone> = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={classes.card} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>

            <span className={classes.cardTitle}>{props.brand + " " + props.model}</span>

            <img src={props.mainPictureURL} alt={props.model} />
            {
                isHovered && (
                    <button>{props.price}</button>
                )
            }
        </div>
    );
};

export default CardIsUsed;