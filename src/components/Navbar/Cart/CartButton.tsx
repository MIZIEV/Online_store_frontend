import CartIconSrc from "/icons/cart.svg";
import classes from "./CartButton.module.scss";
import { useDispatch } from "react-redux";
import { toggleModalVisibility } from "../../../redux/cartSlice";
import { Link } from "react-router-dom";

const CartButton = () => {
  const dispatch = useDispatch();

  const handleCartModalVisibility = () => {
    dispatch(toggleModalVisibility());
  };

  return (
    <Link to="cart">
      <div
        onClick={handleCartModalVisibility}
        className={classes["cart-wrapper"]}
      >
        <img src={CartIconSrc} className={classes.cart}></img>
      </div>
    </Link>
  );
};

export default CartButton;
