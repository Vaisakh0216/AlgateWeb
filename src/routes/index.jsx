import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import RoleRoutes from "./RoleRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (() => {
          const token = localStorage.getItem("authToken");
          const role = localStorage.getItem("role");

          if (token) {
            return (
              <Navigate
                to={`/${role === "counsellor" ? "cdashboard" : "dashboard"}`}
                replace
              />
            );
          }

          return <Navigate to="login" replace />;
        })(),
      },
      { path: "login", element: <Login /> },

      {
        element: (
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "*",
            element: <RoleRoutes />,
          },
        ],
      },
    ],
  },
]);

export default router;
