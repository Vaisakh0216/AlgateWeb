import React from "react";
import ApplicationTable from "../../components/Table";

function counsellorDashboard() {
  return (
    <div>
      {" "}
      <h3
        style={{
          color: "#332C6A",
          fontSize: "16px",
          fontWeight: "600",
          marginTop: "50px",
        }}
      >
        Applications
      </h3>
      <div style={{ marginTop: "20px" }}>
        <ApplicationTable />
      </div>
    </div>
  );
}

export default counsellorDashboard;
