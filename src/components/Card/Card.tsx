import { useDispatch } from "react-redux";
import Button from "../../UI/Button/Button";
import Rating from "../../UI/Rating/Rating";
import { CardProps } from "../../shared.types";

import classes from "./Card.module.scss";
import { CartProduct, addToCart } from "../../redux/cartSlice";

const Card: React.FC<CardProps> = (props) => {
  const dispatch = useDispatch();

  const addProduct = (payload: CartProduct) => {
    dispatch(addToCart(payload));
  };

  return (
    <div className={classes.card}>
      <img src={props.mainPictureURL} alt={props.model} />
      <div className={classes["card-text-wrapper"]}>
        <h2>{props.brand}</h2>
        <h3>{props.model}</h3>
        <Rating rating={Number(props.rating)} />
        <h4>{props.description}</h4>
        <h2>₴ {props.price}</h2>
        <Button
          onClick={() =>
            addProduct({
              id: props.id,
              brand: props.brand,
              model: props.model,
              price: props.price,
              quantity: 1,
              image: props.mainPictureURL,
            })
          }
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default Card;
