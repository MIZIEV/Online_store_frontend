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
import CartModal from "./components/Navbar/Cart/CartModal";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CheckOutPage from "./pages/CheckOut";
import PaymentDeliveryPage from "./pages/PaymentDeliveryPage";
import GuaranteePage from "./pages/GuaranteePage";
import BlogPage from "./pages/BlogPage";
import Blog from "./components/Blog/Blog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
        children: [{ path: "cart", element: <CartModal /> }],
      },
      {
        path: "signin",
        element: <SignInPage />,
        children: [{ path: "cart", element: <CartModal /> }],
      },
      {
        path: "signup",
        element: <SignUpPage />,
        children: [{ path: "cart", element: <CartModal /> }],
      },
      {
        path: "checkout",
        element: <CheckOutPage />,
        children: [{ path: "cart", element: <CartModal /> }],
      },
      {
        path: "admin",
        element: <AdminPage />,
        children: [
          { path: "new", element: <AddNewModal /> },
          { path: ":productId/edit", element: <EditModal /> },
          { path: "cart", element: <CartModal /> },
        ],
      },
      {
        path: "payment-delivery",
        element: <PaymentDeliveryPage />
      },
      {
        path: "guarantee",
        element: <GuaranteePage />
      },
      {
        path: "blog",
        element: <BlogPage />
      },
      {
        path: "blog/:id",
        element: <Blog />
      }
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
