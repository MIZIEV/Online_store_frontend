import CartIconSrc from "/icons/cart.svg";
import classes from "./CartButton.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../../redux/cartSlice";

const CartButton = () => {
  const location = useLocation();
  const cartCount = useSelector(selectCartCount)

  return (
    <Link
      to={`${location.pathname === "/" ? "" : location.pathname}/cart`}
      relative="path"
    >
      <div className={classes["cart-wrapper"]}>
        <img src={CartIconSrc} className={classes.cart}></img>
        {
          cartCount > 0 && (
            <div className={classes['cart-count']}>{cartCount}</div>
          )
        }
      </div>
    </Link>
  );
};

export default CartButton;