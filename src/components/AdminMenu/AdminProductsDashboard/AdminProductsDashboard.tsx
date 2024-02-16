import { useQuery } from "@tanstack/react-query";
import Button from "../../../UI/Button/Button";
import AdminProductsDashboardItem from "../AdminProductsDashboardItem/AdminProductsDashboardItem";
import classes from "./AdminProductsDashboard.module.scss";
import { getMethod } from "../../../utils/http";
import { CardProps } from "../../../shared.types";
import { Link } from "react-router-dom";

const AdminProductsDashboard: React.FC = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => getMethod("http://13.60.5.92:8080/api/product/list"),
  });

  return (
    <div className={classes.dashboard}>
      <div className={classes["dashboard-header"]}>
        <input type="text" placeholder="Search..." />
        <Link to="new">
          <Button className={classes["add-new-button"]}>+ Add New</Button>
        </Link>
      </div>
      {isPending && <p>Fetching items...</p>}
      {isError && <p>Failed to fetch items</p>}
      <table className={classes.table}>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Model</th>
            <th>Brand</th>
            <th>Description</th>
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
