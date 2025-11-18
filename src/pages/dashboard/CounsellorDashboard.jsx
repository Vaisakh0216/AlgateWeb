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
    "Country",
    "Course",
    "University",
    "Status",
  ];
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    country_id: "",
    status: "",
    application_processor: "",
    application_counselor: "",
  });
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("asc");

  const getApplicationsList = (page, perPage) => {
    axiosInstance
      .get("applications/my-assigned", {
        params: {
          page,
          per_page: perPage,
          search: search,
          sort_by: "created_at",
          sort_direction: sortBy,
          country_id: filters.country_id || undefined,
          status: filters.status || undefined,
          application_processor: filters.application_processor || undefined,
          application_counselor: filters.application_counselor || undefined,
        },
      })
      .then((res) => {
        setLoading(false);
        const rows = res?.data?.data?.map((item) => [
          item.id,
          item.applicant_name,
          item.country.name,
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
  }, [pagination.current_page, pagination.per_page, search, sortBy, filters]);

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
          pagination={pagination}
          onPageChange={(newPage) =>
            setPagination((prev) => ({ ...prev, current_page: newPage }))
          }
          onPerPageChange={(newPerPage) =>
            setPagination((prev) => ({
              ...prev,
              per_page: newPerPage,
              current_page: 1,
            }))
          }
          searchValue={setSearch}
          setSortBy={setSortBy}
          sortBy={sortBy}
          filterAnchorEl={filterAnchorEl}
          filters={filters}
          setFilters={setFilters}
          setFilterAnchorEl={setFilterAnchorEl}
        />
      </div>
    </div>
  );
}

export default CounsellorDashboard;
