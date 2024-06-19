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
import CartModal from "./components/Navbar/Cart/CartModal";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CheckOutPage from "./pages/CheckoutPage";
import PaymentDeliveryPage from "./pages/PaymentDeliveryPage";
import GuaranteePage from "./pages/GuaranteePage";
import BlogPage from "./pages/BlogPage";
import Blog from "./components/Blog/Blog";
import Phone from "./components/Products/Phone";
import TransferComponent from "./components/AdminMenu/AdminTools/TransferComponent";
import ColorControleComponent from "./components/AdminMenu/AdminTools/ColorControlComponent";
import PhoneDescriptionComponent from "./components/AdminMenu/AdminTools/PhoneDescriptionComponent";
import PhoneCatalog from "./pages/PhoneCatalog";
import UserPersonalPage from "./pages/UserPersonalPage";
import BlogSettingComponent from "./components/AdminMenu/BlogDashboard/BlogSettingComponent";
import FeaturesManagment from "./components/AdminMenu/AdminTools/FeaturesManagment";
import OrdersManagment from "./components/AdminMenu/AdminTools/OrdersManagment";

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
        element: <PaymentDeliveryPage />,
        children: [{ path: "cart", element: <CartModal /> }]
      },
      {
        path: "guarantee",
        element: <GuaranteePage />,
        children: [{ path: "cart", element: <CartModal /> }]
      },
      {
        path: "blog",
        element: <BlogPage />,
        children: [{ path: "cart", element: <CartModal /> }]
      },
      {
        path: "blog/:id",
        element: <Blog />,
        children: [{ path: "cart", element: <CartModal /> }]
      },
      {
        path: "phone/:id",
        element: <Phone />,
        children: [{ path: "cart", element: <CartModal /> }]
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
        element: <ColorControleComponent />,
        children: [{ path: "cart", element: <CartModal /> }]
      },
      {
        path: "admin/phone-managment/new",
        element: <AddNewPhoneComponent />,
        children: [{ path: "cart", element: <CartModal /> }]
      }, {
        path: "admin",
        element: <TransferComponent />,
        children: [{ path: "cart", element: <CartModal /> }]
      },
      {
        path: "admin/phone-managment/:phoneId/description",
        element: <PhoneDescriptionComponent />,
        children: [{ path: "cart", element: <CartModal /> }]
      },
      {
        path: "admin/phone-managment/edit/:phoneId",
        element: <AddNewPhoneComponent />,
        children: [{ path: "cart", element: <CartModal /> }]
      },
      {
        path: "phone/catalog",
        element: <PhoneCatalog />,
        children: [{ path: "cart", element: <CartModal /> }]
      },
      {
        path: ":savedUser/personal-page",
        element: <UserPersonalPage />,
        children: [{ path: "cart", element: <CartModal /> }]
      },
      {
        path: "admin/blog-managment",
        element: <BlogSettingComponent />,
        children: [{ path: "cart", element: <CartModal /> }]
      },
      {
        path: "admin/phone-managment/:phoneId/features",
        element: <FeaturesManagment />,
        children: [{ path: "cart", element: <CartModal /> }]
      },
      {
        path: "admin/orders-managment",
        element: <OrdersManagment />,
        children: [{ path: "cart", element: <CartModal /> }]
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
