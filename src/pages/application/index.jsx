import React, { useEffect, useState } from "react";
import ApplicationTable from "../../components/Table";
import axiosInstance from "../../config/axiosConfig";
import { useParams } from "react-router-dom";

const Application = () => {
  const [applications, setApplications] = useState([]);
  const para = useParams();
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
    axiosInstance.get(`application_by_country/${para?.id}`).then((res) => {
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
      <ApplicationTable
        applications={applications}
        tabeHeaders={tabeHeaders}
        loading={loading}
      />
    </div>
  );
};

export default Application;
