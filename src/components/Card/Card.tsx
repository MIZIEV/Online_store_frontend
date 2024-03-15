import Button from "../../UI/Button/Button";
import Rating from "../../UI/Rating/Rating";
import { CardProps } from "../../shared.types";

import classes from "./Card.module.scss";

const Card: React.FC<CardProps> = (props) => {
  console.log(props);
  return (
    <div className={classes.card}>
      <img src={props.pictureURL} alt={props.model} />
      <div className={classes["card-text-wrapper"]}>
        <h2>{props.brand}</h2>
        <h3>{props.model}</h3>
        <Rating rating={Number(props.totalMark)} />
        <h4>{props.description}</h4>
        <h2>₴ {props.price}</h2>
        <Button>Add to cart</Button>
      </div>
    </div>
  );
};

export default Card;
