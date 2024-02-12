import Button from "../../../UI/Button/Button";
import classes from "./AdminProductsDashboardItem.module.scss";

const AdminProductsDashboardItem = () => {
  return (
    <tr className={classes['admin-product-item']}>
      <td>001</td>
      <td>15 PRO MAX</td>
      <td>Iphone</td>
      <td>Some Description</td>
      <td>1400$</td>
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
