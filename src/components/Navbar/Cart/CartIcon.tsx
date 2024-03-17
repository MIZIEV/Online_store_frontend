import CartIconSrc from "/icons/cart.svg";
import classes from "./Cart.module.scss";
import { useDispatch } from "react-redux";
import { toggleModalVisibility } from "../../../redux/cartSlice";

const CartIcon = () => {
  const dispatch = useDispatch();

  const handleCartModalVisibility = () => {
    dispatch(toggleModalVisibility());
  };

  return (
    <img
      onClick={handleCartModalVisibility}
      src={CartIconSrc}
      className={classes.cart}
    ></img>
  );
};

export default CartIcon;
