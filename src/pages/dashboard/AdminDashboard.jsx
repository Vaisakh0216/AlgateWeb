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

// Import flags
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
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ApplicationTable from "../../components/Table";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";

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
    position: "relative", // for absolute drag handle
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
    cursor: isDragging ? "grabbing" : "pointer", // pointer when not dragging
    userSelect: "none",
    textTransform: "capitalize",
  };

  console.log("the flag", flag);

  const handleCardClick = (e) => {
    // If a drag is in progress, ignore the click (prevents accidental click after drag)
    if (isDragging) return;
    if (typeof onClick === "function") onClick(e);
  };

  return (
    <div ref={setNodeRef} style={style} onClick={handleCardClick}>
      {/* Drag handle: listeners/attributes applied here only */}
      <div
        {...listeners}
        {...attributes}
        onClick={(e) => {
          // Prevent this click from bubbling up to the card's onClick
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
  // const [countries, setCountries] = useState(initialCountries);
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [countries, setCountries] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const tabeHeaders = [
    "Student Id",
    "Student Name",
    "Course",
    "University",
    "Remarks",
    "Status",
    "Counsellor",
    "Processor",
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
  };

  const getApplicationsList = (page, perPage) => {
    axiosInstance
      .get("applications", {
        params: { page, per_page: perPage, search: search },
      })
      .then((res) => {
        setLoading(false);
        const rows = res?.data?.data?.map((item) => [
          item.id,
          item.applicant_name,
          item.course,
          item.university,
          "",
          item.status,
          item?.counselor?.name,
          item?.processor?.name,
          "",
        ]);
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
  console.log("this is search value", search);

  useEffect(() => {
    getApplicationsList(pagination.current_page, pagination.per_page);
    getCountriesList();
  }, [pagination.current_page, pagination.per_page, search]);

  console.log("the con", countries);

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

  return (
    <div>
      <h1 style={{ color: "#332C6A", fontSize: "26px", fontWeight: "600" }}>
        Welcome, Admin!
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
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              justifyContent: "space-between",
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
          tabeHeaders={tabeHeaders}
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
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
