import { Link, Outlet } from "react-router-dom";
import AdminProductsDashboard from "../components/AdminMenu/AdminProductsDashboard/AdminProductsDashboard";

const AdminPage = () => {
  return (
    <>
      <h1>
        <Outlet />
        <Link to=".." relative="path">
          Back
        </Link>
      </h1>
      <AdminProductsDashboard />
    </>
  );
};

export default AdminPage;
