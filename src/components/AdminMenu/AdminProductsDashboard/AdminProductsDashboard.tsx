import { useQuery } from "@tanstack/react-query";
import Button from "../../../UI/Button/Button";
import AdminProductsDashboardItem from "../AdminProductsDashboardItem/AdminProductsDashboardItem";
import classes from "./AdminProductsDashboard.module.scss";
import { getMethod } from "../../../utils/http";
import { CardProps } from "../../../shared.types";
import { useNavigate } from "react-router-dom";

const AdminProductsDashboard: React.FC = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => getMethod("http://192.168.31.15:8090/api/phone/list"),
  });

  const navigator = useNavigate();

  function navigateToAddNewPhone() {
    navigator("/admin/phone-managment/new");
  }

  function navigateToColorControl() {
    navigator("/admin/phone-managment/colors")
  }

  return (
    <div className={classes.dashboard}>
      <div className={classes["dashboard-header"]}>
        <input type="text" placeholder="Знайти..." />

        <Button onClick={navigateToColorControl} className={classes["add-new-button"]}>Керування кольорами</Button>

        <Button onClick={navigateToAddNewPhone} className={classes["add-new-button"]}>Додати новий смартфон</Button>
      </div>
      {isPending && <p>Fetching items...</p>}
      {isError && <p>Failed to fetch items</p>}
      <table className={classes.table}>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Model</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Manage</th>
          </tr>
          {data?.map((item: CardProps) => (
            <AdminProductsDashboardItem
              key={item.id}
              id={item.id}
              brand={item.brand}
              model={item.model}
              description={item.description}
              price={item.price}
              pictureURL={item.pictureURL}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductsDashboard;
