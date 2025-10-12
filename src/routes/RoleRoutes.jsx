// RoleRoutes.jsx
import { Navigate, useRoutes } from "react-router-dom";
import { getChildrenByRole } from "./ChildrenByRole";

export default function RoleRoutes() {
  const role = localStorage.getItem("role");

  if (!role) {
    // if somehow accessed without role
    return <Navigate to="/login" replace />;
  }

  const routes = getChildrenByRole(role);

  // fallback if no route matches (shouldn’t happen)
  routes.push({
    path: "*",
    element: (
      <Navigate
        to={`/${role === "counsellor" ? "cdashboard" : "dashboard"}`}
        replace
      />
    ),
  });

  return useRoutes(routes);
}
