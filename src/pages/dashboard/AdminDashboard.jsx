import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import UK from "../../assets/united-kingdom.png";
import SI from "../../assets/slovenia.png";
import SK from "../../assets/slovakia.png";
import MT from "../../assets/mauritius.png";
import ML from "../../assets/malta.png";
import SP from "../../assets/spain.png";
import FL from "../../assets/finland.png";
import SD from "../../assets/sweden.png";
import LT from "../../assets/lithuania.png";
import LV from "../../assets/latvia.png";
import AS from "../../assets/austria.png";
import GM from "../../assets/germany.png";
import FC from "../../assets/france.png";
import SG from "../../assets/singapore.png";
import MY from "../../assets/malaysia.png";
import IR from "../../assets/ireland.png";
import BG from "../../assets/bulgaria.png";
import CZ from "../../assets/czech.png";
import HU from "../../assets/hungary.png";
import DXB from "../../assets/dubai.png";
import ND from "../../assets/netherlands.png";
import AL from "../../assets/albania.png";
import NZ from "../../assets/newzealand.png";
import AUS from "../../assets/australia.png";
import USA from "../../assets/unitedstates.png";
import UB from "../../assets/uzbekistan.png";
import GE from "../../assets/georgia.png";
import KZ from "../../assets/kazakhstan.png";
import KY from "../../assets/kyrgyzstan.png";

import ApplicationTable from "../../components/Table";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";
import { useToast } from "../../components/Toast";
import { format, parseISO } from "date-fns";

// function ApplicationFormDrawer({ open, onClose, onSubmit }) {
//   const [formData, setFormData] = useState({
//     applicant_name: "",
//     email: "",
//     phone: "",
//     age: "",
//     university: "",
//     country_id: "",
//     plustwo_perc: "",
//     degree_perc: "",
//     year_of_pass_out: "",
//     year_intake: "",
//     offered_fee: "",
//     amount_paid: "",
//     fee_proof: null, // ✅ added field for file
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "fee_proof") {
//       setFormData((prev) => ({ ...prev, fee_proof: files[0] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = () => {
//     onSubmit?.(formData);
//     onClose();
//   };

//   const [countryList, setCountryList] = useState([]);

//   useEffect(() => {
//     axiosInstance.get("/countries").then((res) => setCountryList(res?.data));
//   }, []);

//   return (
//     <Drawer anchor="right" open={open} onClose={onClose}>
//       <Box
//         sx={{
//           width: 600,
//           padding: 3,
//           display: "flex",
//           flexDirection: "column",
//           gap: 2,
//         }}
//       >
//         <Typography variant="h6" fontWeight={600}>
//           Add New Application
//         </Typography>
//         <Divider />
//         <div
//           style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
//         >
//           <TextField
//             label="Full Name"
//             name="applicant_name"
//             fullWidth
//             variant="outlined"
//             value={formData.applicant_name}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Email"
//             name="email"
//             type="email"
//             fullWidth
//             variant="outlined"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div
//           style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
//         >
//           <TextField
//             label="Phone"
//             name="phone"
//             fullWidth
//             variant="outlined"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Age"
//             name="age"
//             type="number"
//             fullWidth
//             variant="outlined"
//             value={formData.age}
//             onChange={handleChange}
//           />
//         </div>
//         <div
//           style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
//         >
//           <TextField
//             label="Select Visa Type"
//             name="country_id"
//             select
//             fullWidth
//             variant="outlined"
//             value={formData.country_id}
//             onChange={handleChange}
//           >
//             <MenuItem value="student">Student Visa</MenuItem>
//             <MenuItem value="job">Job Visa</MenuItem>
//           </TextField>
//           <TextField
//             label="Country"
//             name="country_id"
//             select
//             fullWidth
//             variant="outlined"
//             value={formData.country_id}
//             onChange={handleChange}
//           >
//             {countryList?.map((country) => (
//               <MenuItem key={country?.id} value={country?.id}>
//                 {country?.name}
//               </MenuItem>
//             ))}
//           </TextField>
//         </div>
//         <div
//           style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
//         >
//           <TextField
//             label="University"
//             name="university"
//             fullWidth
//             variant="outlined"
//             value={formData.university}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Course"
//             name="course"
//             fullWidth
//             variant="outlined"
//             value={formData.course}
//             onChange={handleChange}
//           />
//         </div>
//         <div
//           style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
//         >
//           <TextField
//             label="12th Mark (%)"
//             name="plustwo_perc"
//             type="number"
//             fullWidth
//             variant="outlined"
//             value={formData.plustwo_perc}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Degree Mark (%)"
//             name="degree_perc"
//             type="number"
//             fullWidth
//             variant="outlined"
//             value={formData.degree_perc}
//             onChange={handleChange}
//           />
//         </div>
//         <div
//           style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
//         >
//           <TextField
//             label="Intake"
//             name="year_intake"
//             fullWidth
//             variant="outlined"
//             value={formData.year_intake}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Year of passout"
//             name="year_of_pass_out"
//             fullWidth
//             variant="outlined"
//             value={formData.year_of_pass_out}
//             onChange={handleChange}
//           />
//         </div>
//         <div
//           style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
//         >
//           <TextField
//             label="Offered Registration Fee"
//             name="offered_fee"
//             type="number"
//             fullWidth
//             variant="outlined"
//             value={formData.offered_fee}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Amount Student Paying Now"
//             name="amount_paid"
//             type="number"
//             fullWidth
//             variant="outlined"
//             value={formData.amount_paid}
//             onChange={handleChange}
//           />
//         </div>

//         {/* ✅ Added File Picker */}
//         <div>
//           <Typography variant="body2" sx={{ mb: 1 }}>
//             Upload Fee Payment Proof
//           </Typography>
//           <input
//             type="file"
//             name="fee_proof"
//             accept="image/*,application/pdf"
//             onChange={handleChange}
//           />
//         </div>

//         <Box
//           sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
//         >
//           <Button onClick={onClose} variant="outlined" color="inherit">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             variant="contained"
//             sx={{ bgcolor: "#332C6A" }}
//           >
//             Add
//           </Button>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// }

// --- Replace your SortableCard with this ---
function SortableCard({ id, name, flag, onClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: "relative",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 40px",
    borderRadius: "20px",
    border: "1px solid #e5e7eb",
    boxShadow: isDragging
      ? "0 8px 16px rgba(0, 0, 0, 0.12)"
      : "0 4px 12px rgba(0, 0, 0, 0.08)",
    gap: 10,
    minWidth: "120px",
    cursor: isDragging ? "grabbing" : "pointer",
    userSelect: "none",
    textTransform: "capitalize",
  };

  const handleCardClick = (e) => {
    if (isDragging) return;
    if (typeof onClick === "function") onClick(e);
    localStorage.setItem("selectedCountry", id);
  };

  return (
    <div ref={setNodeRef} style={style} onClick={handleCardClick}>
      <div
        {...listeners}
        {...attributes}
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          cursor: "grab",
          padding: 6,
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label="drag-handle"
      >
        <DragIndicatorIcon fontSize="small" />
      </div>

      <img src={flag} width={60} alt={name} style={{ pointerEvents: "none" }} />
      <span
        style={{ fontSize: "14px", fontWeight: "400", pointerEvents: "none" }}
      >
        {name}
      </span>
    </div>
  );
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [countries, setCountries] = useState([]);
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
  const [loading, setLoading] = useState(true);
  const currentRole = localStorage.getItem("role");
  const countriesList = localStorage.getItem("countries");
  const { showToast } = useToast();
  const adminTabeHeaders = [
    "Student Id",
    "Created Date",
    "Student Name",
    "Country",
    "Course",
    "University",
    "Status",
    "Counsellor",
    "Processor",
    "Vendor",
  ];

  const processorTabeHeaders = [
    "Student Id",
    "Created Date",
    "Student Name",
    "Country",
    "Course",
    "University",
    "Status",
    "Counsellor",
    "Vendor",
  ];

  const flagMap = {
    UK,
    SI,
    SK,
    MT,
    ML,
    SP,
    FL,
    SD,
    LT,
    LV,
    AS,
    GM,
    FC,
    SG,
    MY,
    IR,
    BG,
    CZ,
    HU,
    DXB,
    ND,
    AL,
    NZ,
    AUS,
    USA,
    UB,
    GE,
    KZ,
    KY,
  };

  const getApplicationsList = (page, perPage) => {
    setLoading(true);
    axiosInstance
      .get(
        `${
          currentRole == "admin" ? "applications" : "applications/my-assigned"
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
        const blockedCodes = ["UK", "MT", "SG", "MY"];
        const data = res?.data?.data || [];
        const filteredData =
          currentRole === "processor"
            ? data.filter((item) => !blockedCodes.includes(item?.country?.code))
            : data;

        setLoading(false);
        const rows = filteredData?.map((item) =>
          currentRole == "admin"
            ? [
                item.id,
                format(parseISO(item?.created_at), "dd-MM-yyyy"),
                item.applicant_name,
                item?.country?.name,
                item.course,
                item.university,
                item.status,
                item?.counselor?.name,
                item?.processor?.name,
                item?.vendor,
                "",
              ]
            : [
                item.id,
                format(parseISO(item?.created_at), "dd-MM-yyyy"),
                item.applicant_name,
                item?.country?.name,
                item.course,
                item.university,
                item.status,
                item?.counselor?.name,
                item?.vendor,
                "",
              ]
        );
        setApplications(rows);
        setPagination(res?.data?.pagination);
      });
  };

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

  useEffect(() => {
    getApplicationsList(pagination.current_page, pagination.per_page);
    getCountriesList();
  }, [pagination.current_page, pagination.per_page, search, sortBy, filters]);

  // sensors allow mouse + touch + keyboard drag
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = countries.findIndex((c) => c.id === active.id);
      const newIndex = countries.findIndex((c) => c.id === over.id);

      setCountries((items) => {
        const updated = [...items];
        // Swap elements
        [updated[oldIndex], updated[newIndex]] = [
          updated[newIndex],
          updated[oldIndex],
        ];
        return updated;
      });
    }
  };

  const handleDeleteApplication = async (id) => {
    await axiosInstance.delete(`/applications/${id}`).then((res) => {
      showToast({
        message: "Application deleted successfully!",
        severity: "success",
      });
      getApplicationsList(pagination.current_page, pagination.per_page);
    });
  };

  const updateApplication = (data, status) => {
    console.log("this is data", data, status);
    if (status == "transfer") {
      axiosInstance
        .post(`applications/${data?.application_id}/transfer`, {
          new_processor_id: data?.user_id,
        })
        .then((res) => {
          showToast({
            message: "Application updated successfully!",
            severity: "success",
          });
          getApplicationsList();
        });
    } else {
      axiosInstance.put(`/applications/${data?.id}`, data).then((res) => {
        showToast({
          message: "Application updated successfully!",
          severity: "success",
        });
        getApplicationsList();
      });
    }
  };

  return (
    <div>
      <h1 style={{ color: "#332C6A", fontSize: "26px", fontWeight: "600" }}>
        {currentRole == "admin" ? "Welcome, Admin!" : "Welcome, Counsellor!"}
      </h1>
      <h3
        style={{
          color: "#332C6A",
          fontSize: "16px",
          fontWeight: "600",
          marginTop: "50px",
        }}
      >
        Countries
      </h3>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={countries.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 5, // controls spacing between cards
            }}
          >
            {countries.map((country) => (
              <SortableCard
                key={country.id}
                id={country.id}
                name={country.name}
                flag={country.flag}
                onClick={() => {
                  navigate(`/application/${country.id}`);
                }}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <h3
        style={{
          color: "#332C6A",
          fontSize: "16px",
          fontWeight: "600",
          marginTop: "50px",
        }}
      >
        Recent Application
      </h3>
      <div style={{ marginTop: "20px" }}>
        <ApplicationTable
          applications={applications}
          tabeHeaders={
            currentRole == "admin" ? adminTabeHeaders : processorTabeHeaders
          }
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
          loading={loading}
          actionFunction={updateApplication}
          deleteFunction={handleDeleteApplication}
          filterAnchorEl={filterAnchorEl}
          filters={filters}
          setFilters={setFilters}
          setFilterAnchorEl={setFilterAnchorEl}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
