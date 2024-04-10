import { createPortal } from "react-dom";
import classes from "./CartModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  CartProduct,
  CartState,
  toggleModalVisibility,
} from "../../../redux/cartSlice";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

const CartModal = () => {
  const cart = useSelector(
    (state: { cart: CartState; items: CartProduct }) => state.cart
  );

  const dispatch = useDispatch();

  const handleCartModalVisibility = () => {
    dispatch(toggleModalVisibility());
  };

  return (
    <>
      {cart.modalVisible &&
        createPortal(
          <div className={classes.cartModalContainer}>
            <div className={classes.cartModal}>
              <p className={classes.modalTop}>
                <Link to="..">
                  <button onClick={handleCartModalVisibility}>Close</button>
                </Link>
              </p>
              <div>
                {cart.items &&
                  cart.items.map((item) => (
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
