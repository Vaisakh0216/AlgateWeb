import React from "react";
import ApplicationTable from "../../components/Table";

const Application = () => {
  return (
    <div>
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
      <ApplicationTable />
    </div>
  );
};

export default Application;
