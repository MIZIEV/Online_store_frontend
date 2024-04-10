import { createPortal } from "react-dom";
import classes from "./CartModal.module.scss";
import { useSelector } from "react-redux";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";
import CloseButton from "./CloseButton";
import { CardProps } from "../../../shared.types";

interface RootState {
  cart: { items: CardProps[] };
}

const CartModal = () => {
  const cart = useSelector((state: RootState) => state.cart.items);

  return (
    <>
      {createPortal(
        <div className={classes.cartModalContainer}>
          <div className={classes.cartModal}>
            <p className={classes.modalTop}>
              <CloseButton />
            </p>
            <div>
              {cart &&
                cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
            </div>
            <p className={classes.modalDown}>
              <Link to="/checkout" relative="path">
                <button>CheckOut</button>
              </Link>
            </p>
          </div>
        </div>,
        document.getElementById("modal")!
      )}
    </>
  );
};

export default CartModal;
