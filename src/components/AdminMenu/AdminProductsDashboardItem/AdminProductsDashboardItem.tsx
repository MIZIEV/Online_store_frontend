import Button from "../../../UI/Button/Button";
import { CardProps } from "../../../shared.types";
import classes from "./AdminProductsDashboardItem.module.scss";

const AdminProductsDashboardItem: React.FC<CardProps> = (props) => {
  return (
    <tr className={classes["admin-product-item"]}>
      <td>{props.id}</td>
      <td>{props.model}</td>
      <td>{props.brand}</td>
      <td>{props.description}</td>
      <td>{props.price} UAH</td>
      <td>
        <div className={classes.manage}>
          <Button className={classes["edit-button"]}>✏️Edit</Button>
          <Button className={classes["delete-button"]}>🗑️Delete</Button>
        </div>
      </td>
    </tr>
  );
};

export default AdminProductsDashboardItem;
