import React from "react";
import ApplicationTable from "../../components/Table";

function index() {
  const applications = [
    {
      name: "United Kingdom",
      avatar: "https://i.pravatar.cc/40?img=1",
      university: "Buckinghamshire New University",
      course: "Msc International Business Management",
      remarks: "Academic document is yet to upload.",
      status: "Open",
    },
    {
      name: "Slovenia",
      avatar: "https://i.pravatar.cc/40?img=2",
      university: "Buckinghamshire New University",
      course: "Biomedical Science",
      remarks: "Passport copy shared.",
      status: "Open",
    },
    {
      name: "Slovakia",
      avatar: "https://i.pravatar.cc/40?img=3",
      university: "University of Chester",
      course: "Bachelor of Science with Honours",
      remarks: "Passport copy requested.",
      status: "Open",
    },
    {
      name: "Spain",
      avatar: "https://i.pravatar.cc/40?img=4",
      university: "University of Chester",
      course: "Bachelor of Science with Honours",
      remarks: "Interview is pending",
      status: "In Progress",
    },
    {
      name: "Finland",
      avatar: "https://i.pravatar.cc/40?img=1",
      university: "Buckinghamshire New University",
      course: "Msc International Business Management",
      remarks: "Academic document is yet to upload.",
      status: "Open",
    },
    {
      name: "Sweden",
      avatar: "https://i.pravatar.cc/40?img=2",
      university: "Buckinghamshire New University",
      course: "Biomedical Science",
      remarks: "Passport copy shared.",
      status: "Open",
    },
    {
      name: "Lithuania",
      avatar: "https://i.pravatar.cc/40?img=3",
      university: "University of Chester",
      course: "Bachelor of Science with Honours",
      remarks: "Passport copy requested.",
      status: "Open",
    },
    {
      name: "Lativa",
      avatar: "https://i.pravatar.cc/40?img=4",
      university: "University of Chester",
      course: "Bachelor of Science with Honours",
      remarks: "Interview is pending",
      status: "In Progress",
    },
  ];
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
        Country List
      </h3>
      <div style={{ marginTop: "20px" }}>
        <ApplicationTable applications={applications} />
      </div>
    </div>
  );
}

export default index;
