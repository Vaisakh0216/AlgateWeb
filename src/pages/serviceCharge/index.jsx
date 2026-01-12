import React, { useEffect, useState } from "react";
import ApplicationTable from "../../components/Table";
import axiosInstance from "../../config/axiosConfig";
import { useParams } from "react-router-dom";
import ServiceChargeTable from "../../components/ServiceChargeTable";

const ServiceCharge = () => {
  const [applications, setApplications] = useState([]);
  const para = useParams();
  const [loading, setLoading] = useState(true);
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
  const currentRole = localStorage.getItem("role");
  const currentUserInfo = localStorage.getItem("userInfo");

  const tabeHeaders = [
    "Student Id",
    "Student Name",
    "Course",
    "Country",
    "University",
    "Total Amount",
    "Paid Amount",
    "Pending Amount",
  ];

  const getApplicationsList = (page, perPage) => {
    setLoading(true);
    axiosInstance
      .get("applications", {
        params: {
          page,
          per_page: perPage,
          search: search,
          sort_by: "created_at",
          sort_direction: sortBy,
          country_id: filters.country_id || undefined,
          status: filters.status || undefined,
          ...(currentRole === "processor" && {
            application_processor: JSON.parse(currentUserInfo)?.id,
          }),
          ...(currentRole === "counsellor" && {
            application_counselor: JSON.parse(currentUserInfo)?.id,
          }),
        },
      })
      .then((res) => {
        setLoading(false);

        const blockedCodes = ["UK", "MT", "SG", "MY"];
        const data = res?.data?.data || [];
        const filteredData =
          currentRole === "processor"
            ? data.filter((item) => !blockedCodes.includes(item?.country?.code))
            : currentRole === "counsellor"
            ? data.filter((item) => blockedCodes.includes(item?.country?.code))
            : data;

        const rows = filteredData?.map((item) => [
          item.id,
          item.applicant_name,
          item.course,
          item?.country?.name,
          item.university,
          item?.service_charges?.reduce(
            (sum, charge) => sum + Number(charge?.expected_amount || 0),
            0
          ),
          item?.service_charges?.reduce(
            (sum, charge) =>
              sum +
              (charge?.transactions?.reduce(
                (tranSum, trans) => tranSum + Number(trans?.amount || 0),
                0
              ) || 0),
            0
          ),
          item?.service_charges?.reduce(
            (sum, charge) => sum + Number(charge?.expected_amount || 0),
            0
          ) -
            item?.service_charges?.reduce(
              (sum, charge) =>
                sum +
                (charge?.transactions?.reduce(
                  (tranSum, trans) => tranSum + Number(trans?.amount || 0),
                  0
                ) || 0),
              0
            ),
        ]);
        setApplications(rows);
        setPagination(res?.data?.pagination);
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
        Applications
      </h3>
      <ServiceChargeTable
        applications={applications}
        tabeHeaders={tabeHeaders}
        loading={loading}
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

export default ServiceCharge;
