import CartIconSrc from "/icons/cart.svg";
import classes from "./CartButton.module.scss";
import { Link, useLocation } from "react-router-dom";

const CartButton = () => {
  const location = useLocation();

  return (
    <Link
      to={`${location.pathname === "/" ? "" : location.pathname}/cart`}
      relative="path"
    >
      <div className={classes["cart-wrapper"]}>
        <img src={CartIconSrc} className={classes.cart}></img>
      </div>
    </Link>
  );
};

export default CartButton;
