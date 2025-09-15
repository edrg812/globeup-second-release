import { createBrowserRouter, Outlet } from "react-router-dom";
import Root from "../components/Root";
import ProtectedRoutes from "./ProtectedRoutes";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import { AuthRoutes, PublicRoutes } from "./PublicRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      ...PublicRoutes,
      {
        path: "/",
        element: <Outlet />,
        children: [ProtectedRoutes.AdminRoutes, ProtectedRoutes.ResselerRoutes],
      },
    ],
  },
  ...AuthRoutes,
]);

export default router;
