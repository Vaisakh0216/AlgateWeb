import Dashboard from "../pages/Dashboard";
import Application from "../pages/application";
import ApplicationDetail from "../pages/application/ApplicationDetails";
import CountryList from "../pages/country";
import Invoice from "../pages/invoice/invoice";
import CounsellorDashboard from "../pages/dashboard/CounsellorDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

export function getChildrenByRole(role) {
  switch (role) {
    case "counsellor":
      return [
        {
          path: "cdashboard",
          element: <CounsellorDashboard />,
        },
        {
          path: "application",
          children: [
            { index: true, element: <Application /> },
            { path: ":id", element: <Application /> },
            { path: ":id/:childId", element: <ApplicationDetail /> },
          ],
        },
      ];

    case "admin":
    case "process":
      return [
        {
          path: "dashboard",
          element: <AdminDashboard />,
        },
        {
          path: "application",
          children: [
            { index: true, element: <Application /> },
            { path: ":id", element: <Application /> },
            { path: ":id/:childId", element: <ApplicationDetail /> },
          ],
        },
        {
          path: "country",
          element: <CountryList />,
        },
        {
          path: "invoice",
          element: <Invoice />,
        },
      ];

    default:
      return [
        {
          path: "dashboard",
          element: <AdminDashboard />,
        },
      ];
  }
}
