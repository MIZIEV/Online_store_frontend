import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../../redux/cartSlice";

import classes from "./CartItem.module.scss";

const CartItem: React.FC<{
  item: {
    id: number;
    brand: string;
    model: string;
    price: number;
    quantity: number;
  };
}> = ({ item }) => {
  const dispatch = useDispatch();

  const handleDeleteItem = (payload: { id: number }) => {
    dispatch(removeFromCart(payload));
  };

  return (
    <div className={classes.item} key={item.id}>
      <p>
        {item.brand} {item.model} {item.price} x {item.quantity} ={" "}
        {item.price * item.quantity}
      </p>
      <button onClick={() => handleDeleteItem({ id: item.id })}>X</button>
    </div>
  );
};

export default CartItem;
