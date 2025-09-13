// import * as React from "react";
// import {
//   Box,
//   Drawer,
//   Button,
//   Stepper,
//   Step,
//   StepLabel,
//   StepContent,
//   Typography,
//   Paper,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import EditSquareIcon from "@mui/icons-material/EditSquare";
// import FileUploader from "../FileUploader";
// import FilePreviewCard from "../uploadedFile";
// import CommentInputBox from "../commentBox";

// const steps = [
//   {
//     label: "Application Submission (with fee)",
//     description: ``,
//   },
//   {
//     label: "University Interview",
//     description:
//       "An ad group contains one or more ads which target a shared set of keywords.",
//   },
//   {
//     label: "English Test (150 mins / 2 weeks)",
//     description: `Try out different ad text to see what brings in the most customers.`,
//   },
//   {
//     label: "Start Financials & AIC Coordination",
//     description: `Try out different ad text to see what brings in the most customers.`,
//   },
//   {
//     label: "Letter of Acceptance & Invoices",
//     description: `Learn how to enhance your ads using features like ad extensions.`,
//   },
//   {
//     label: "Pay Tuition Fees",
//     description: `Learn how to enhance your ads using features like ad extensions.`,
//   },
//   {
//     label: "Prepare Study & Dorm Agreements",
//     description: `Learn how to enhance your ads using features like ad extensions.`,
//   },
//   {
//     label: "Sign & Send Back Agreements",
//     description: `Learn how to enhance your ads using features like ad extensions.`,
//   },
//   {
//     label: "Receive Visa Letters & AIC Confirmation",
//     description: `Learn how to enhance your ads using features like ad extensions.`,
//   },
//   {
//     label: "Hello Verification (₹14,000)",
//     description: `Learn how to enhance your ads using features like ad extensions.`,
//   },
//   ,
//   {
//     label: "Prepare Documents from Checklist",
//     description: `Learn how to enhance your ads using features like ad extensions.`,
//   },
//   {
//     label: "Visa Submission",
//     description: `Learn how to enhance your ads using features like ad extensions.`,
//   },
// ];

// export default function Dashboard() {
//   const [open, setOpen] = React.useState(false);

//   // Store which steps are expanded
//   const [expandedSteps, setExpandedSteps] = React.useState([]);

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };

//   // Toggle individual step
//   const handleStepClick = (index) => {
//     setExpandedSteps((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
//     );
//   };

//   // Expand or collapse all steps
//   const handleExpandCollapseAll = () => {
//     if (expandedSteps.length === steps.length) {
//       setExpandedSteps([]); // Collapse all
//     } else {
//       setExpandedSteps(steps.map((_, index) => index)); // Expand all
//     }
//   };

//   const allExpanded = expandedSteps.length === steps.length;

//   return (
//     <div>
//       <Button onClick={toggleDrawer(true)}>Open drawer</Button>
//       <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
//         <div style={{ height: "100%", width: "1000px" }}>
//           {/* Header */}
//           <div
//             style={{
//               padding: "20px",
//               borderBottom: "1px solid black",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <h3 style={{ color: "#332C6A" }}>Application</h3>
//             <div>
//               <EditSquareIcon sx={{ color: "#332C6A" }} />
//               <CloseIcon
//                 sx={{ marginLeft: "10px", color: "#332C6A", cursor: "pointer" }}
//                 onClick={toggleDrawer(false)}
//               />
//             </div>
//           </div>

//           {/* User Info */}
//           <div
//             style={{
//               padding: "20px",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <div
//               style={{
//                 backgroundColor: "#332C6A",
//                 width: "80px",
//                 height: "80px",
//                 borderRadius: "50%",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <h1 style={{ color: "white", fontSize: "30px" }}>J</h1>
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 marginLeft: "20px",
//               }}
//             >
//               <span style={{ fontWeight: "600" }}>Jishan</span>
//               <span style={{ fontSize: "12px" }}>alexarawles@gmail.com</span>
//             </div>
//           </div>

//           {/* Process Steps */}
//           <div style={{ padding: "20px" }}>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignContent: "center",
//               }}
//             >
//               <h4 style={{ fontSize: "16px", fontWeight: "600" }}>
//                 Process Steps
//               </h4>

//               {/* Expand/Collapse All Button */}
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "flex-end",
//                   alignContent: "center",
//                 }}
//               >
//                 <Button
//                   variant="outlined"
//                   size="small"
//                   onClick={handleExpandCollapseAll}
//                   sx={{
//                     mb: 2,
//                     textTransform: "inherit",
//                     height: "30px",
//                     backgroundColor: "#332C6A",
//                     color: "white",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {allExpanded ? "Collapse" : "Expand"}
//                 </Button>
//               </div>
//             </div>

//             <Box>
//               <Stepper orientation="vertical" nonLinear>
//                 {steps.map((step, index) => (
//                   <Step key={step.label} expanded>
//                     <StepLabel
//                       onClick={() => handleStepClick(index)}
//                       sx={{
//                         cursor: "pointer",
//                         userSelect: "none",
//                         fontWeight: 600,
//                       }}
//                     >
//                       {step.label}
//                     </StepLabel>

//                     {expandedSteps.includes(index) && (
//                       <StepContent>
//                         <div
//                           style={{
//                             display: "flex",
//                             flexWrap: "wrap",
//                             gap: "16px",
//                             justifyContent: "flex-start",
//                           }}
//                         >
//                           <FilePreviewCard />
//                           <FilePreviewCard />
//                           <FilePreviewCard />
//                           <FilePreviewCard />
//                           <FilePreviewCard />
//                           <FilePreviewCard />
//                           <FilePreviewCard />
//                           <FilePreviewCard />
//                           <FilePreviewCard />
//                           <FilePreviewCard />
//                           <FilePreviewCard />
//                           <FilePreviewCard />
//                           <FilePreviewCard />
//                           <FilePreviewCard />
//                           <FilePreviewCard />
//                           <FilePreviewCard />
//                         </div>
//                         <div
//                           style={{
//                             width: "100%",
//                             display: "flex",
//                             justifyContent: "center",
//                             alignContent: "center",
//                           }}
//                         >
//                           <FileUploader />
//                         </div>
//                         <div>
//                           <CommentInputBox />
//                         </div>
//                       </StepContent>
//                     )}
//                   </Step>
//                 ))}
//               </Stepper>
//             </Box>
//           </div>
//         </div>
//       </Drawer>
//     </div>
//   );
// }

//                             display: "flex",
//                             flexWrap: "wrap",
//                             gap: "16px",
//                             justifyContent: "flex-start",

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

// Sortable card component
function SortableCard({ id, name, flag }) {
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
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img src={flag} width={60} alt={name} />
      <span style={{ fontSize: "14px", fontWeight: "400" }}>{name}</span>
    </div>
  );
}

const Dashboard = () => {
  const [countries, setCountries] = useState(initialCountries);

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
            }}
          >
            {countries.map((country) => (
              <SortableCard
                key={country.id}
                id={country.id}
                name={country.name}
                flag={country.flag}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Dashboard;
