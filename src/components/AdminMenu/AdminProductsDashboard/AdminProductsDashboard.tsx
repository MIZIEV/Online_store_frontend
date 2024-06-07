import { useQuery } from "@tanstack/react-query";
import Button from "../../../UI/Button/Button";
import AdminProductsDashboardItem from "../AdminProductsDashboardItem/AdminProductsDashboardItem";
import classes from "./AdminProductsDashboard.module.scss";
import { getMethod } from "../../../utils/http";
import { Phone } from "../../../shared.types";
import { useNavigate } from "react-router-dom";

const AdminProductsDashboard: React.FC = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => getMethod("http://13.60.76.209:8080/api/phone/list"),
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
            <th>Модель</th>
            <th>Бренд</th>
            <th>Ціна</th>
            <th>Керування</th>
          </tr>
          {data?.map((item: Phone) => (
            <AdminProductsDashboardItem
              key={item.id}
              id={item.id}
              brand={item.brand}
              model={item.model}
              price={item.price}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductsDashboard;
