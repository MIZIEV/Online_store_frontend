import { createPortal } from "react-dom";
import classes from "./CartModal.module.scss";
import { useSelector } from "react-redux";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";
import CloseButton from "./CloseButton";
import { Phone, SelectedPhone } from "../../../shared.types";
import { totalPrice } from "../../../redux/cartSlice";

interface RootState {
  cart: { items: SelectedPhone[] };
}

const CartModal = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const totalPriceValue = useSelector(totalPrice);

  return (
    <>
      {createPortal(
        <div className={classes.cartModalContainer}>
          <div className={classes.cartModal}>
            <p className={classes.modalTop}>
              <CloseButton />
            </p>
            <p className={classes.header}>Кошик</p>
            {cart.length > 0 ? (
              <div className={classes.products}>
                {cart &&
                  cart.map((item) => <CartItem key={item.id} item={item} />)}
              </div>
            ) : (
              <p className={classes.fallback}>Ваш кошик пустий</p>
            )}
            {cart.length > 0 && (
              <div className={classes.modalDown}>
                <p className={classes.total}>Загалом: {totalPriceValue} ₴</p>
                <p className={classes.buttons}>
                  <Link to="/">
                    <button className={classes.return}>
                      Повернутись до вибору
                    </button>
                  </Link>
                  <Link to="/checkout" relative="path">
                    <button className={classes.checkout}>
                      Оформити замовлення
                    </button>
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>,
        document.getElementById("modal")!
      )}
    </>
  );
};

export default CartModal;