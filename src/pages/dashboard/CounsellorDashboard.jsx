import React, { useState, useEffect } from "react";
import ApplicationTable from "../../components/Table";
import axiosInstance from "../../config/axiosConfig";

function CounsellorDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const tabeHeaders = [
    "Student Id",
    "Student Name",
    "Course",
    "University",
    "Remarks",
    "Status",
  ];

  const getApplicationsList = () => {
    axiosInstance.get("applications/my-assigned").then((res) => {
      setLoading(false);
      const rows = res?.data?.data?.map((item) => [
        item.id,
        item.applicant_name,
        item.course,
        item.university,
        "",
        item.status,
        "",
      ]);
      setApplications(rows);
    });
  };

  useEffect(() => {
    getApplicationsList();
  }, []);

  const createApplication = (data) => {
    axiosInstance.post("applications", data).then((res) => {
      getApplicationsList();
    });
  };

  return (
    <div>
      <h1 style={{ color: "#332C6A", fontSize: "26px", fontWeight: "600" }}>
        Welcome, Counsellor!
      </h1>
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
        <ApplicationTable
          applications={applications}
          tabeHeaders={tabeHeaders}
          actionFunction={createApplication}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default CounsellorDashboard;
