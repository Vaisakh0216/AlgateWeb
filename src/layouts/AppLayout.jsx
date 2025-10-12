import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import HomeIcon from "@mui/icons-material/Home";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function AppLayout() {
  const location = useLocation();
  const path = location.pathname.split("/");
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ flexShrink: 0 }}>
        <Header />
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{ width: "220px", flexShrink: 0 }}>
          <Sidebar />
        </div>

        <main
          style={{
            flex: 1,
            padding: "2rem",
            background: "#f5f5f5",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textTransform: "capitalize",
              fontSize: "14px",
              fontWeight: "600",
              marginTop: "-10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              {path.filter((p) => p !== "")[0] != "dashboard" &&
                path
                  .filter((p) => p !== "")
                  .map((p, index, arr) => (
                    <span
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 5,
                      }}
                      onClick={() => navigate(p)}
                    >
                      {p === "dashboard" ? (
                        <span>dashboard</span>
                      ) : (
                        <>
                          {index === 0 && (
                            <HomeIcon
                              style={{ color: "#332C6A" }}
                              fontSize="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/dashboard");
                              }}
                            />
                          )}
                          {decodeURIComponent(p).endsWith("}")
                            ? decodeURIComponent(p).slice(0, -1)
                            : decodeURIComponent(p)}
                        </>
                      )}
                      {index < arr.length - 1 && (
                        <ArrowForwardIosIcon style={{ fontSize: "14px" }} />
                      )}
                    </span>
                  ))}
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
