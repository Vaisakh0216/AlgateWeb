import React, { useState, useEffect } from "react";
import ApplicationTable from "../../components/Table";
import axiosInstance from "../../config/axiosConfig";
import axios from "axios";

function CounsellorDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  const tabeHeaders = [
    "Student Id",
    "Student Name",
    "Course",
    "University",
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
        item.status,
        "",
      ]);
      setApplications(rows);
    });
  };

  useEffect(() => {
    getApplicationsList();
  }, []);

  const createApplication = (data, status) => {
    console.log("this is status", data);
    if (status == "create") {
      axios
        .post("https://algatecrm-api.v-nexus.com/api/applications", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          getApplicationsList();
        });
    } else {
      axiosInstance.put(`/applications/${data?.id}`, data).then((res) => {
        getApplicationsList();
      });
    }
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
