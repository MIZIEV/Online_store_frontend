import Button from "../../../UI/Button/Button";
import { Phone } from "../../../shared.types";
import classes from "./AdminProductsDashboardItem.module.scss";
import { deleteProduct, queryClient } from "../../../utils/http";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const AdminProductsDashboardItem: React.FC<Phone> = (props) => {

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
          <Link to={`/admin/phone-managment/edit/${props.id}`}>
            <Button className={classes["edit-button"]}>Оновити</Button>
          </Link>
          <Link to={`/admin/phone-managment/${props.id}/description`}>
            <Button className={classes["edit-button"]}>Опис</Button>
          </Link>
          <Button onClick={handleDelete} className={classes["delete-button"]}>
            Видалити
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default AdminProductsDashboardItem;
