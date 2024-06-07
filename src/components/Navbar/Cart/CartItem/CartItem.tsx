import { useDispatch } from "react-redux";
import {
  removeFromCart,
  decrease,
  increase,
} from "../../../../redux/cartSlice";

import classes from "./CartItem.module.scss";

const CartItem: React.FC<{
  item: {
    id: number;
    brand: string;
    model: string;
    price: number;
    quantity: number;
    image: string;
  };
}> = ({ item }) => {
  const dispatch = useDispatch();

  const handleDeleteItem = (payload: { id: number }) => {
    dispatch(removeFromCart(payload));
  };

  const handleIncreaseItem = (payload: { id: number }) => {
    dispatch(increase(payload));
  };

  const handleDecreaseItem = (payload: { id: number }) => {
    dispatch(decrease(payload));
  };

  return (
    <div className={classes.item}>
      <img src={item.image} alt="" />
      <div className={classes.info}>
        <h1>
          {item.brand} {item.model}{" "}
          <button onClick={() => handleDeleteItem({ id: item.id })}>
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M42 8H32C32 5.794 30.206 4 28 4H20C17.794 4 16 5.794 16 8H6V12H42V8Z" fill="black" />
              <path d="M22 36H18V16H10V40.286C10 42.334 11.794 44 14 44H34C36.206 44 38 42.334 38 40.286V16H30V36H26V16H22V36Z" fill="black" />
            </svg>
          </button>
        </h1>
        <p>{item.price}грн</p>
        <p>
          <button onClick={() => handleDecreaseItem({ id: item.id })}>-</button>
          {item.quantity}
          <button onClick={() => handleIncreaseItem({ id: item.id })}>+</button>
        </p>
      </div>
    </div>
  );
};

export default CartItem;
