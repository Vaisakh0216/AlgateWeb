import React, { useState } from "react";
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
import Uk from "../assets/united-kingdom.png";
import Slovenia from "../assets/slovenia.png";
import Slovakia from "../assets/slovakia.png";
import Mauritius from "../assets/mauritius.png";
import Malta from "../assets/malta.png";
import Spain from "../assets/spain.png";
import Finland from "../assets/finland.png";
import Sweden from "../assets/sweden.png";
import Lithuania from "../assets/lithuania.png";
import Latvia from "../assets/latvia.png";
import Austria from "../assets/austria.png";
import Germany from "../assets/germany.png";
import France from "../assets/france.png";
import Singapore from "../assets/singapore.png";
import Malaysia from "../assets/malaysia.png";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ApplicationTable from "../components/Table";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useNavigate } from "react-router-dom";

const initialCountries = [
  { id: "uk", name: "United Kingdom", flag: Uk },
  { id: "slovenia", name: "Slovenia", flag: Slovenia },
  { id: "slovakia", name: "Slovakia", flag: Slovakia },
  { id: "spain", name: "Spain", flag: Spain },
  { id: "finland", name: "Finland", flag: Finland },
  { id: "sweden", name: "Sweden", flag: Sweden },
  { id: "lithuania", name: "Lithuania", flag: Lithuania },
  { id: "latvia", name: "Latvia", flag: Latvia },
  { id: "malta", name: "Malta", flag: Malta },
  { id: "mauritius", name: "Mauritius", flag: Mauritius },
  { id: "austria", name: "Austria", flag: Austria },
  { id: "germany", name: "Germany", flag: Germany },
  { id: "france", name: "France", flag: France },
  { id: "singapore", name: "Singapore", flag: Singapore },
  { id: "malaysia", name: "Malaysia", flag: Malaysia },
];

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
  };

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
  const [countries, setCountries] = useState(initialCountries);
  const navigate = useNavigate();
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
        <ApplicationTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
