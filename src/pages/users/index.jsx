import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosConfig";
import UsersTable from "../../components/UsersTable";
import { format, parseISO } from "date-fns";

const UsersListing = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    role_id: "",
  });
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("asc");

  const tabeHeaders = [
    "User Id",
    "Name",
    "Email",
    "Phone",
    "Role",
    "Created Date",
  ];

  const getApplicationsList = (page, perPage) => {
    setLoading(true);
    axiosInstance
      .get("users", {
        params: {
          page,
          per_page: perPage,
          search: search,
          sort_by: "created_at",
          sort_direction: sortBy,
          role_id: filters.role_id || undefined,
          application_processor: filters.application_processor || undefined,
          application_counselor: filters.application_counselor || undefined,
        },
      })
      .then((res) => {
        setLoading(false);
        const rows = res?.data?.data?.map((item) => ({
          display: [
            item.id,
            item.name,
            item.email,
            item?.phone,
            item?.role?.name,
            format(parseISO(item?.created_at), "MMMM dd, yyyy"),
          ],
          original: item, // ✅ keep original object for edit
        }));
        setApplications(rows);
      });
  };

  useEffect(() => {
    getApplicationsList(pagination.current_page, pagination.per_page);
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
        Users
      </h3>
      <UsersTable
        applications={applications}
        tabeHeaders={tabeHeaders}
        loading={loading}
        refreshData={getApplicationsList}
        filterAnchorEl={filterAnchorEl}
        filters={filters}
        setFilters={setFilters}
        setFilterAnchorEl={setFilterAnchorEl}
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
      />
    </div>
  );
};

export default UsersListing;
