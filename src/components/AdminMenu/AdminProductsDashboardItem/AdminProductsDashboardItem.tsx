import Button from "../../../UI/Button/Button";
import { CardProps } from "../../../shared.types";
import classes from "./AdminProductsDashboardItem.module.scss";
import { deleteProduct, queryClient } from "../../../utils/http";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const AdminProductsDashboardItem: React.FC<CardProps> = (props) => {
  /*----------------------TODO-----------------------
                 when the product is removed, it removed from DB, but stayed in the page
                 think how to fix it!!!
  */
  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleDelete = () => {
    mutate(props.id);
  };

  return (
    <tr className={classes["admin-product-item"]}>
      <td>{props.id}</td>
      <td>{props.model}</td>
      <td>{props.brand}</td>
      <td>{props.price} UAH</td>
      <td>
        <div className={classes.manage}>
          <Link to={`${props.id}/edit`}>
            <Button className={classes["edit-button"]}>✏️Edit</Button>
          </Link>
          <Button onClick={handleDelete} className={classes["delete-button"]}>
            🗑️Delete
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default AdminProductsDashboardItem;
