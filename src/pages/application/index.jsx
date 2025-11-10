import React, { useEffect, useState } from "react";
import ApplicationTable from "../../components/Table";
import axiosInstance from "../../config/axiosConfig";
import { useParams } from "react-router-dom";

const Application = () => {
  const [applications, setApplications] = useState([]);
  const para = useParams();
  const [loading, setLoading] = useState(true);
  const currentRole = localStorage.getItem("role");
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
  const [sortBy, setSortBy] = useState("desc");
  const tabeHeaders = [
    "Student Id",
    "Student Name",
    "Country",
    "Course",
    "University",
    "Status",
  ];

  const getCountriesList = () => {
    axiosInstance.get("countries").then((res) => {
      const rows = res?.data?.map((item) => ({
        id: item.id,
        name: item.name,
        flag: flagMap[item?.code] || null,
      }));
      setCountries(rows);
    });
  };

  const getApplicationsList = (page, perPage) => {
    axiosInstance
      .get(
        para?.id?.length
          ? `application_by_country/${para.id}`
          : `${
              currentRole === "admin"
                ? "applications"
                : "applications/my-assigned"
            }`,
        {
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
        }
      )
      .then((res) => {
        setLoading(false);
        const rows = res?.data?.data?.map((item) => [
          item.id,
          item.applicant_name,
          item?.country?.name,
          item.course,
          item.university,
          item.status,
          "",
        ]);
        setApplications(rows);
        setPagination(res?.data?.pagination);
      });
  };

  useEffect(() => {
    getApplicationsList(pagination.current_page, pagination.per_page);
    getCountriesList();
  }, [pagination.current_page, pagination.per_page, search, sortBy, filters]);

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
        filterAnchorEl={filterAnchorEl}
        filters={filters}
        setFilters={setFilters}
        setFilterAnchorEl={setFilterAnchorEl}
        searchValue={setSearch}
        setSortBy={setSortBy}
        sortBy={sortBy}
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
      />
    </div>
  );
};

export default Application;
