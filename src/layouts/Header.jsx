import React from "react";
import Logo from "../assets/logo.png";

function Header() {
  return (
    <header
      style={{
        height: "70px",
        background: "white",
        color: "#333", // dark text for contrast
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // subtle shadow
        position: "sticky",
        top: 0,
      }}
    >
      <img src={Logo} width={115} alt="Logo" />
      <nav style={{ display: "flex", gap: "1rem" }}>
        <a href="/help" style={{ color: "#333", textDecoration: "none" }}>
          Help
        </a>
        <a href="/login" style={{ color: "#333", textDecoration: "none" }}>
          Logout
        </a>
      </nav>
    </header>
  );
}

export default Header;
