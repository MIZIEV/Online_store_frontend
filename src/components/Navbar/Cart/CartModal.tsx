import { createPortal } from "react-dom";
import classes from "./CartModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  CartProduct,
  CartState,
  toggleModalVisibility,
} from "../../../redux/cartSlice";

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
                <button onClick={handleCartModalVisibility}>Close</button>
              </p>
              {cart.items &&
                cart.items.map((item) => (
                  <div key={item.id}>
                    <p>{item.brand}</p>
                    <p>{item.model}</p>
                    <p>
                      {item.price} x {item.quantity} ={" "}
                      {item.price * item.quantity}
                    </p>
                  </div>
                ))}
            </div>
          </div>,
          document.getElementById("modal")!
        )}
    </>
  );
};

export default CartModal;
