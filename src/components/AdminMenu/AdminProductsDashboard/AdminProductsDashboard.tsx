import { useQuery } from "@tanstack/react-query";
import Button from "../../../UI/Button/Button";
import AdminProductsDashboardItem from "../AdminProductsDashboardItem/AdminProductsDashboardItem";
import classes from "./AdminProductsDashboard.module.scss";
import { getMethod } from "../../../utils/http";
import { Phone } from "../../../shared.types";
import { Outlet, useNavigate } from "react-router-dom";
import { HOST } from "../../../utils/host";
import { useMemo, useState } from "react";

const AdminProductsDashboard: React.FC = () => {
  const HOST_PORT = HOST;
  const { data, isPending, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => getMethod("http://" + HOST_PORT + "/api/phone/list"),
  });

  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigator = useNavigate();

  function navigateToAddNewPhone() {
    navigator("/admin/phone-managment/new");
  }

  function navigateToColorControl() {
    navigator("/admin/phone-managment/colors")
  }

  const filteredData = useMemo(() => {
    return data?.filter((item: Phone) =>
      item.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  return (
    <div className={classes.dashboard}>

      <Outlet />

      <div className={classes["dashboard-header"]}>
        <input
          type="text"
          placeholder="Пошук по моделі"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

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
          {filteredData?.map((item: Phone) => (
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