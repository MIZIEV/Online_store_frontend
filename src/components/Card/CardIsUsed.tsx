import React, { useState } from "react";
import classes from "./CardIsUsed.module.scss";
import { Phone } from "../../shared.types";
import { useNavigate } from "react-router";

const CardIsUsed: React.FC<Phone> = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigator = useNavigate();

    const handleNavigateOnClick = () => {
        navigator(`/phone/${props.id}`)
      }
    return (
        <div className={classes.card} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>

            <span className={classes.cardTitle}>{props.brand + " " + props.model}</span>

            <img onClick={handleNavigateOnClick} src={props.mainPictureURL} alt={props.model} />
            {
                isHovered && (
                    <button>{props.price}</button>
                )
            }
        </div>
    );
};

export default CardIsUsed;