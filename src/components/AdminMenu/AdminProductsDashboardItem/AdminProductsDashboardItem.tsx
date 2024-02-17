import Button from "../../../UI/Button/Button";
import { CardProps } from "../../../shared.types";
import classes from "./AdminProductsDashboardItem.module.scss";
import { deleteProduct } from "../../../utils/http";

const AdminProductsDashboardItem: React.FC<CardProps> = (props) => {

  /*----------------------TODO-----------------------
                 when the product is removed, it removed from DB, but stayed in the page
                 think how to fix it!!!
  */

  const handleDelete = async () => {
    await deleteProduct(props.id);
  }

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
          <Button onClick={handleDelete} className={classes["delete-button"]}>🗑️Delete</Button>
        </div>
      </td>
    </tr>
  );
};

export default AdminProductsDashboardItem;
