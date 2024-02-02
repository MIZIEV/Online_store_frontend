import Button from "../../UI/Button/Button";
import { CardProps } from "../../shared.types";

import classes from "./Card.module.scss";

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className={classes.card}>
      <img src={props.pictureURL} alt={props.model} />
      <div className={classes["card-text-wrapper"]}>
        <h3>{props.model}</h3>
        <h4>{props.brand}</h4>
        <p>{props.description}</p>
        <p>{props.price}</p>
      </div>
      <Button>Buy</Button>
    </div>
  );
};

export default Card;
