import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";

const isLoggedIn = true; // 🔐 replace with real auth check

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: "login", element: <Login /> },

      {
        path: "dashboard",
        element: (
          <ProtectedRoute isAuth={isLoggedIn}>
            <AppLayout />
          </ProtectedRoute>
        ),
        children: [{ index: true, element: <Dashboard /> }],
      },
    ],
  },
]);

export default router;
