import { useDispatch } from "react-redux";
import Button from "../../UI/Button/Button";
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
        <span className={classes.cardTitle}>{props.brand + " " + props.model}</span>
        
        <hr />

        <div className={classes.bottomCardBlock}>
          <span className={classes.price}>₴ {props.price}</span>
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
            <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.3245 2.135L5.4285 11.448L2.9615 17H8H14H18V15H6.039L7.15 12.5H17.2205L20.3875 3H4.7205L3.7205 0H0V2H2.1665L2.3245 2.135Z" fill="#12372A" />
            </svg>
          </Button>

        </div>
      </div>
    </div>
  );
};

export default Card;
