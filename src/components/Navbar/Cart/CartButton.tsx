import CartIconSrc from "/icons/cart.svg";
import classes from "./CartButton.module.scss";
import { useDispatch } from "react-redux";
import { toggleModalVisibility } from "../../../redux/cartSlice";
import { Link, useLocation } from "react-router-dom";

const CartButton = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleCartModalVisibility = () => {
    dispatch(toggleModalVisibility());
  };

  return (
    <Link
      to={`${location.pathname === "/" ? "" : location.pathname}/cart`}
      relative="path"
    >
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
