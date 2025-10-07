import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Application from "../pages/application";
import ApplicationDetail from "../pages/application/ApplicationDetails";
import CountryList from "../pages/country/index";
import Invoice from "../pages/invoice/invoice";
import { getChildrenByRole } from "./RoleRoutes";

const isLoggedIn = true; // 🔐 replace with real auth check
const currentRole = localStorage.getItem("role");
console.log("role", currentRole);

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: "login", element: <Login /> },

      {
        element: (
          <ProtectedRoute isAuth={isLoggedIn}>
            <AppLayout />
          </ProtectedRoute>
        ),
        children: getChildrenByRole(currentRole),
        // children: [
        //   { path: "dashboard", element: <Dashboard /> },
        //   {
        //     path: "application",
        //     children: [
        //       { index: true, element: <Application /> },
        //       { path: ":id", element: <Application /> },
        //       { path: ":id/:childId", element: <ApplicationDetail /> },
        //     ],
        //   },
        //   { path: "country", element: <CountryList /> },
        //   { path: "invoice", element: <Invoice /> },
        // ],
      },
    ],
  },
]);

export default router;
