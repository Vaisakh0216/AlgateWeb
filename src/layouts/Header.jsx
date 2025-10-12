import React, { useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import Logo from "../assets/logo.png";

function Header() {
  // 🧠 Example: you can replace these with values from localStorage or API
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 🧩 State for menu open/close
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login"; // ensures reload
  };

  return (
    <header
      style={{
        height: "70px",
        background: "white",
        color: "#333",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <img src={Logo} width={115} alt="Logo" />

      {/* Right side: Nav + Profile */}
      <nav style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        {/* Avatar & Profile Menu */}
        <Box>
          <IconButton onClick={handleMenuOpen}>
            <Avatar
              sx={{
                bgcolor: "#1976d2",
                width: 40,
                height: 40,
                fontWeight: "bold",
              }}
            >
              {userInfo?.name?.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 220,
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {userInfo.name}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {userInfo.email}
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </nav>
    </header>
  );
}

export default Header;
