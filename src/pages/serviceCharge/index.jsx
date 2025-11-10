import React, { useEffect, useState } from "react";
import ApplicationTable from "../../components/Table";
import axiosInstance from "../../config/axiosConfig";
import { useParams } from "react-router-dom";
import ServiceChargeTable from "../../components/ServiceChargeTable";

const ServiceCharge = () => {
  const [applications, setApplications] = useState([]);
  const para = useParams();
  const [loading, setLoading] = useState(true);

  const tabeHeaders = [
    "Student Id",
    "Student Name",
    "Course",
    "University",
    "Pending Amount",
    "Totak Amount",
  ];

  const getApplicationsList = () => {
    axiosInstance.get(`applications`).then((res) => {
      setLoading(false);
      const rows = res?.data?.data?.map((item) => [
        item.id,
        item.applicant_name,
        item.course,
        item.university,
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
        item?.service_charges?.reduce(
          (sum, charge) => sum + Number(charge?.expected_amount || 0),
          0
        ),
        ,
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
      <ServiceChargeTable
        applications={applications}
        tabeHeaders={tabeHeaders}
        loading={loading}
      />
    </div>
  );
};

export default ServiceCharge;
