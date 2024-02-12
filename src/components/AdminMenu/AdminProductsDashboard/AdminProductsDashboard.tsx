import Button from "../../../UI/Button/Button";
import AdminProductsDashboardItem from "../AdminProductsDashboardItem/AdminProductsDashboardItem";
import classes from "./AdminProductsDashboard.module.scss";

const AdminProductsDashboard: React.FC = () => {
  return (
    <div className={classes.dashboard}>
      <div className={classes["dashboard-header"]}>
        <input type="text" placeholder="Search..." />
        <Button className={classes["add-new-button"]}>+ Add New</Button>
      </div>
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
          <AdminProductsDashboardItem />
          <AdminProductsDashboardItem />
          <AdminProductsDashboardItem />
          <AdminProductsDashboardItem />
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductsDashboard;
