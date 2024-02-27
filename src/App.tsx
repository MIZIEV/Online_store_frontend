import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import ErrorPage from "./pages/Error";
import AdminPage from "./pages/Admin";
import AddNewModal from "./components/AdminMenu/AdminModals/AddNewModal";
import { queryClient } from "./utils/http";
import EditModal from "./components/AdminMenu/AdminModals/EditModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
      {
        path: "admin",
        element: <AdminPage />,
        children: [
          { path: "new", element: <AddNewModal /> },
          { path: ":productId/edit", element: <EditModal /> },
        ],
      },
    ],
  },

]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
