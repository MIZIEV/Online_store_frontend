import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import ErrorPage from "./pages/Error";
import AdminPage from "./pages/Admin";
import AddNewPhoneComponent from "./components/AdminMenu/AdminTools/AddNewPhoneComponent";
import { queryClient } from "./utils/http";
import EditModal from "./components/AdminMenu/AdminTools/EditModal";
import CartModal from "./components/Navbar/Cart/CartModal";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CheckOutPage from "./pages/CheckOut";
import PaymentDeliveryPage from "./pages/PaymentDeliveryPage";
import GuaranteePage from "./pages/GuaranteePage";
import BlogPage from "./pages/BlogPage";
import Blog from "./components/Blog/Blog";
import Phone from "./components/Products/Phone";
import TransferComponent from "./components/AdminMenu/AdminTools/TransferComponent";
import ColorControleComponent from "./components/AdminMenu/AdminTools/ColorControlComponent";
import PhoneDescriptionComponent from "./components/AdminMenu/AdminTools/PhoneDescriptionComponent";

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
      },
      {
        path: "phone/:id",
        element: <Phone />
      },
      {
        path: "admin/phone-managment/",
        element: <AdminPage />,
        children: [
          { path: "cart", element: <CartModal /> },
        ],
      },
      {
        path: "/admin/phone-managment/colors",
        element: <ColorControleComponent />
      },
      {
        path: "admin/phone-managment/new",
        element: <AddNewPhoneComponent />
      }, {
        path: "admin",
        element: <TransferComponent />
      },
      {
        path: "admin/phone-managment/:phoneId/description",
        element: <PhoneDescriptionComponent />
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
