import Categories from "../Pages/Categories/Categories";
import CustomerProfile from "../Pages/Profile/CustomerProfile/CustomerProfile";
import SellerProfile from "../Pages/Profile/SellerProfile/SellerProfile";
import SupplierProfile from "../Pages/Profile/SupplierProfile/SupplierProfile";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import CheckOut from "../Pages/Checkout/CheckOut";
import ProfilePage from "../components/UserProfile/ProfilePage";
import CartPage from "../components/UserProfile/AllUserCart";
import SettingsButtons from "../components/UserProfile/SettingsButtons";
import OrderHistory from "../components/UserProfile/OrderHistory";
import ResetPasswordConfirm from "../Pages/Login/ResetPasswordConfirm";
import ForgotPassword from "../Pages/Login/ForgotPassword";
import Logout from "../Pages/Logout/Logout";

import ProfileWrapper from "../Pages/Profile/ProfileWrapper";
import CreateOrEditProduct from "../Pages/AdminPanel/Products/CreateOrEditProduct/CreateOrEditProduct";
import ProductPage from "../Pages/ProductPage/ProductPage";
import SellerProduct from "../Pages/ProductPage/SellerProductPage/SellerProduct";
import ResellerCheckOut from "../Pages/ResellerCheckout/ResellerCheckout";
import CreateOrEditProductAsSupplier from "../Pages/SupplierProduct/CreateOrEditProductAsSupplier/CreateOrEditProductAsSupplier";

const PublicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/customer/profile",
    element: <CustomerProfile />,
  },
  {
    path: "seller/profile",
    element: <SellerProfile />,
  },
  {
    path: "/profile",
    element: <ProfileWrapper />,
  },


  {
    path: "/supplier/product/create",
    element: <CreateOrEditProductAsSupplier />
  },
  {
    path: "/supplier/product/edit/:id",
    element: <CreateOrEditProductAsSupplier
      mode="edit"
      
    />
  },
  {
    path: "/supplier/profile",
    element: <SupplierProfile />,
  },
  {
    path: "/checkout",
    element: <CheckOut />,
  },
  {
    path: "/reseller/checkout",
    element: <ResellerCheckOut />,
  },
  {
    path: "customer/profile/profile",
    element: <ProfilePage />,
  },
  {
    path: "/settings",
    element: <SettingsButtons />,
  },
  {
    path: "/dashboard",
    element: <OrderHistory />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/reset-password/:uid/:token",
    element: <ResetPasswordConfirm />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/products/:id",
    element: <ProductPage />,
  },
  {
    path: "/seller/products/:id",
    element: <SellerProduct />,
  },
];

const AuthRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
];

export { PublicRoutes, AuthRoutes };
