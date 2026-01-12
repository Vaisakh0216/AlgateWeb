import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PublicIcon from "@mui/icons-material/Public";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleIcon from "@mui/icons-material/People";

export default function Sidebar() {
  const location = useLocation(); // Get current path
  const currentRole = localStorage.getItem("role");

  const menuItems =
    currentRole == "counsellor"
      ? [
          {
            name: "Dashboard",
            path: "/dashboard",
            icon: <DashboardIcon fontSize="small" />,
          },
          {
            name: "Service Charge",
            path: "/serviceCharge",
            icon: <ManageAccountsIcon fontSize="small" />,
          },
        ]
      : [
          {
            name: "Dashboard",
            path: "/dashboard",
            icon: <DashboardIcon fontSize="small" />,
          },
          {
            name: "Application",
            path: "/application",
            icon: <ListAltIcon fontSize="small" />,
          },
          // {
          //   name: "Countries",
          //   path: "/country",
          //   icon: <PublicIcon fontSize="small" />,
          // },
          {
            name: "Invoice",
            path: "/invoice",
            icon: <ReceiptIcon fontSize="small" />,
          },
          {
            name: "Service Charge",
            path: "/serviceCharge",
            icon: <ManageAccountsIcon fontSize="small" />,
          },
          ...(currentRole === "admin"
            ? [
                {
                  name: "Users",
                  path: "/users",
                  icon: <PeopleIcon fontSize="small" />,
                },
              ]
            : []),
        ];

  return (
    <aside
      style={{
        width: "200px",
        background: "#332C6A",
        color: "#fff",
        padding: "1rem",
        minHeight: "100%",
        zIndex: 1000,
      }}
    >
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          marginTop: "2rem",
        }}
      >
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path; // check if current path
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: isActive ? "#028BBF" : "white", // highlight active
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
                fontSize: ".9375rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {item.icon}
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
