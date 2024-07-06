import { useSelector } from "react-redux";
import Button from "../../UI/Button/Button";
import { Phone } from "../../shared.types";
import classes from "./Card.module.scss";
import { useNavigate } from "react-router";
import { RootState } from "@reduxjs/toolkit/query";

const Card: React.FC<Phone> = (props) => {
  const navigator = useNavigate();

  const isAdded = useSelector((state: RootState) =>
    state.cart.items.some((item) => item.id === props.id)
  );

  const handleNavigateOnClick = () => {
    navigator(`/phone/${props.id}`)
  }

  return (
    <div className={classes.card}>
      <img onClick={handleNavigateOnClick} src={props.mainPictureURL} alt={props.model} />

      <div className={classes["card-text-wrapper"]}>
        <span className={classes.cardTitle}>{props.brand + " " + props.model}</span>

        <hr />

        <div className={classes.bottomCardBlock}>
          <span className={classes.price}>₴ {props.price}</span>
          <Button
            onClick={handleNavigateOnClick}
          >
            {isAdded ? (
              <svg
                width="21"
                height="17"
                viewBox="0 0 21 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 12.5L4 9L2.5 10.5L7.5 15.5L18.5 4.5L17 3L7.5 12.5Z"
                  fill="#12372A"
                />
              </svg>
            ) : (
              <svg
                width="21"
                height="17"
                viewBox="0 0 21 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.3245 2.135L5.4285 11.448L2.9615 17H8H14H18V15H6.039L7.15 12.5H17.2205L20.3875 3H4.7205L3.7205 0H0V2H2.1665L2.3245 2.135Z"
                  fill="#12372A"
                />
              </svg>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;