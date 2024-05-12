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
            <img src="public/icons/Trash.svg" />
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
