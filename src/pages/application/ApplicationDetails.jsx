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
// import FileUploader from "../../FileUploader";
// import FilePreviewCard from "../../uploadedFile";
// import CommentInputBox from "../../commentBox";
// import axiosInstance from "../../config/axiosConfig";
// import { useParams } from "react-router-dom";
// import PendingUploadCard from "../../components/PendingUpload";
// import MessageIcon from "@mui/icons-material/Message";

// const steps = [
//   {
//     label: "Documents Collection",
//     description: `- Proof of Sponsorship - In case you are sponsored by a family/relative, a notarized declaration of sponsorship to be submitted. Proof of professional status of the sponsor – contract of employment, pay slips for the last 3 months; self-employed – certificate of registration of the Company, company’s bank statements for the last three months dully signed and stamped by the bank and Current years ITR`,
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

// export default function ApplicationDetail() {
//   const [open, setOpen] = React.useState(false);
//   const [applicationSteps, setApplicationSteps] = React.useState();
//   const [expandedSteps, setExpandedSteps] = React.useState([]);
//   const para = useParams();

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };

//   const handleStepClick = (index) => {
//     setExpandedSteps((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
//     );
//   };

//   const handleExpandCollapseAll = () => {
//     if (expandedSteps.length === steps.length) {
//       setExpandedSteps([]);
//     } else {
//       setExpandedSteps(steps.map((_, index) => index));
//     }
//   };

//   const allExpanded = expandedSteps.length === steps.length;

//   const getApplicationSteps = () => {
//     axiosInstance
//       .get(`applications/${para?.id}/full-with-responses`)
//       .then((res) => {
//         setApplicationSteps(res?.data?.application);
//       });

//     // axiosInstance.get(`countries/${para?.id}/full-steps`).then((res) => {
//     //   setApplicationSteps(res?.data?.steps);
//     // });
//   };

//   React.useEffect(() => {
//     getApplicationSteps();
//   }, []);

//   // console.log("this is details", applicationSteps);
//   // const match = data.description.match(/\[(.*?)\]/);
//   // const documents = match ? match[1].split(/\s*,\s*/) : [];

//   return (
//     <div>
//       <div style={{ height: "100%" }}>
//         <div
//           style={{
//             padding: "20px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <h3 style={{ color: "#332C6A" }}>Application</h3>
//         </div>

//         {/* User Info */}
// <div
//   style={{
//     backgroundColor: "#fff",
//     borderRadius: "12px",
//     padding: "24px 28px",
//     margin: "20px",
//     boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
//     border: "1px solid #f0f0f0",
//     display: "flex",
//     flexDirection: "column",
//     gap: "24px",
//   }}
// >
//   {/* Profile Header */}
//   <div
//     style={{
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       flexWrap: "wrap",
//     }}
//   >
//     <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//       <div
//         style={{
//           backgroundColor: "#332C6A",
//           width: "70px",
//           height: "70px",
//           borderRadius: "50%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           fontSize: "28px",
//           fontWeight: "600",
//           color: "#fff",
//         }}
//       >
//         {applicationSteps?.applicant_name?.charAt(0)?.toUpperCase() ||
//           "U"}
//       </div>

//       <div>
//         <h3
//           style={{
//             margin: 0,
//             fontSize: "18px",
//             fontWeight: "700",
//             color: "#1a1a1a",
//           }}
//         >
//           {applicationSteps?.applicant_name || "--"}
//         </h3>
//         <p
//           style={{
//             margin: "4px 0 2px",
//             fontSize: "14px",
//             color: "#666",
//           }}
//         >
//           {applicationSteps?.email || "--"}
//         </p>
//       </div>
//     </div>
//   </div>

//   {/* Personal Information */}
//   <div>
//     <h4
//       style={{
//         fontSize: "15px",
//         fontWeight: "600",
//         color: "#332C6A",
//         marginBottom: "16px",
//       }}
//     >
//       Personal Information
//     </h4>

//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//         gap: "12px 24px",
//         fontSize: "14px",
//       }}
//     >
//       <div>
//         <span style={{ color: "#888" }}>Age</span>
//         <p
//           style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}
//         >
//           {applicationSteps?.age || "--"}
//         </p>
//       </div>

//       <div>
//         <span style={{ color: "#888" }}>Phone</span>
//         <p
//           style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}
//         >
//           {applicationSteps?.phone || "--"}
//         </p>
//       </div>

//       <div>
//         <span style={{ color: "#888" }}>Degree %</span>
//         <p
//           style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}
//         >
//           {applicationSteps?.degree_perc
//             ? `${applicationSteps.degree_perc}%`
//             : "--"}
//         </p>
//       </div>

//       <div>
//         <span style={{ color: "#888" }}>Plus Two %</span>
//         <p
//           style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}
//         >
//           {applicationSteps?.plustwo_perc
//             ? `${applicationSteps.plustwo_perc}%`
//             : "--"}
//         </p>
//       </div>

//       <div>
//         <span style={{ color: "#888" }}>Intake Year</span>
//         <p
//           style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}
//         >
//           {applicationSteps?.year_intake || "--"}
//         </p>
//       </div>

//       <div>
//         <span style={{ color: "#888" }}>Passout Year</span>
//         <p
//           style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}
//         >
//           {applicationSteps?.year_of_pass_out || "--"}
//         </p>
//       </div>
//     </div>
//   </div>
// </div>

//         {/* Process Steps */}
//         <div style={{ padding: "20px" }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignContent: "center",
//             }}
//           >
//             <h4 style={{ fontSize: "16px", fontWeight: "600" }}>
//               Process Steps
//             </h4>

//             {/* Expand/Collapse All Button */}
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 alignContent: "center",
//               }}
//             >
//               <Button
//                 variant="outlined"
//                 size="small"
//                 onClick={handleExpandCollapseAll}
//                 sx={{
//                   mb: 2,
//                   textTransform: "inherit",
//                   height: "30px",
//                   backgroundColor: "#332C6A",
//                   color: "white",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {allExpanded ? "Collapse" : "Expand"}
//               </Button>
//             </div>
//           </div>

//           <Box>
//             <Stepper orientation="vertical" nonLinear>
//               {applicationSteps?.steps?.map((step, index) => (
//                 <Step key={step.title} expanded>
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between", // ✅ keeps icon at far right
//                       width: "100%",
//                     }}
//                   >
//                     <StepLabel
//                       onClick={() => handleStepClick(index)}
//                       sx={{
//                         cursor: "pointer",
//                         userSelect: "none",
//                         fontWeight: 600,
//                       }}
//                     >
//                       {step.title}
//                     </StepLabel>

//                     <MessageIcon
//                       style={{
//                         color: "green",
//                         padding: "3px",
//                         borderRadius: "50%",
//                         border: "1px solid green",
//                         fontSize: "15px",
//                         backgroundColor: "white",
//                       }}
//                     />
//                   </div>

//                   {expandedSteps.includes(index) && (
//                     <StepContent>
//                       <div
//                         style={{
//                           display: "flex",
//                           flexWrap: "wrap",
//                           gap: "16px",
//                           justifyContent: "flex-start",
//                         }}
//                       >
//                         {step?.description
//                           ?.match(/\[(.*?)\]/)?.[1]
//                           ?.split(/\s*,\s*/)
//                           ?.map((item, index) => (
//                             <PendingUploadCard
//                               key={index}
//                               name={item.trim()}
//                               id={step?.id}
//                               attachmentName={step?.attachments?.map(
//                                 (file) => file
//                               )}
//                             />
//                           ))}
//                       </div>
//                     </StepContent>
//                   )}
//                 </Step>
//               ))}
//             </Stepper>
//           </Box>
//         </div>
//       </div>
//     </div>
//   );
// }

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
//   IconButton,
//   Tooltip,
//   tooltipClasses,
// } from "@mui/material";
// import MessageIcon from "@mui/icons-material/Message";
// import CloseIcon from "@mui/icons-material/Close";
// import PendingUploadCard from "../../components/PendingUpload";
// import axiosInstance from "../../config/axiosConfig";
// import { useParams } from "react-router-dom";
// import CommentBox from "../../commentBox";
// import InfoIcon from "@mui/icons-material/Info";
// import { styled } from "@mui/material/styles";

// export default function ApplicationDetail() {
//   const [open, setOpen] = React.useState(false);
//   const [selectedStepId, setSelectedStepId] = React.useState(null);
//   const [applicationSteps, setApplicationSteps] = React.useState();
//   const [expandedSteps, setExpandedSteps] = React.useState([]);
//   const para = useParams();
//   const [stepComments, setStepComments] = React.useState([]);

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };

//   const handleMessageClick = (stepId, comm) => {
//     setSelectedStepId(stepId);
//     setStepComments(comm);
//     setOpen(true);
//   };

//   const handleStepClick = (index) => {
//     setExpandedSteps((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
//     );
//   };

//   const getApplicationSteps = () => {
//     axiosInstance
//       .get(`applications/${para?.id}/full-with-responses`)
//       .then((res) => {
//         setApplicationSteps(res?.data?.application);
//       });
//   };

//   React.useEffect(() => {
//     getApplicationSteps();
//   }, []);

//   const allExpanded = expandedSteps.length === applicationSteps?.steps?.length;

//   const handleExpandCollapseAll = () => {
//     if (expandedSteps.length === applicationSteps?.steps?.length) {
//       setExpandedSteps([]);
//     } else {
//       setExpandedSteps(applicationSteps?.steps?.map((_, index) => index));
//     }
//   };

//   const formatTooltipDescription = (text) => {
//     if (!text) return "";

//     // Extract numbered items like 1) 2) 3)
//     const regex = /\d+\)([^0-9]+)/g;
//     const matches = [...text.matchAll(regex)].map((m) => m[1].trim());

//     // Remove everything before the first number for clean title
//     const heading = text.split("1)")[0].trim();

//     return (
//       <>
//         {heading && (
//           <Typography component="div" sx={{ mb: 0.5, fontWeight: 600 }}>
//             {heading}
//           </Typography>
//         )}
//         <ol style={{ margin: 0, paddingLeft: "20px" }}>
//           {matches.map((item, i) => (
//             <li key={i} style={{ marginBottom: "4px" }}>
//               {item}
//             </li>
//           ))}
//         </ol>
//       </>
//     );
//   };

//   const StyledTooltip = styled(({ className, ...props }) => (
//     <Tooltip {...props} arrow classes={{ popper: className }} />
//   ))(() => ({
//     [`& .${tooltipClasses.tooltip}`]: {
//       backgroundColor: "gray",
//       color: "#fff",
//       fontSize: "12.5px",
//       fontWeight: 400,
//       padding: "10px 12px",
//       borderRadius: "10px",
//       maxWidth: 320,
//       lineHeight: 1.5,
//       whiteSpace: "pre-line",
//       boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
//     },
//     [`& .${tooltipClasses.arrow}`]: {
//       color: "#2e2574",
//     },
//   }));

//   return (
//     <div style={{ height: "100%" }}>
//       {/* Header */}
//       <div
//         style={{
//           padding: "20px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <h3 style={{ color: "#332C6A" }}>Application</h3>
//       </div>

//       <div
//         style={{
//           backgroundColor: "#fff",
//           borderRadius: "12px",
//           padding: "24px 28px",
//           margin: "20px",
//           boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
//           border: "1px solid #f0f0f0",
//           display: "flex",
//           flexDirection: "column",
//           gap: "24px",
//         }}
//       >
//         {/* Profile Header */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexWrap: "wrap",
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//             <div
//               style={{
//                 backgroundColor: "#332C6A",
//                 width: "70px",
//                 height: "70px",
//                 borderRadius: "50%",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 fontSize: "28px",
//                 fontWeight: "600",
//                 color: "#fff",
//               }}
//             >
//               {applicationSteps?.applicant_name?.charAt(0)?.toUpperCase() ||
//                 "U"}
//             </div>

//             <div>
//               <h3
//                 style={{
//                   margin: 0,
//                   fontSize: "18px",
//                   fontWeight: "700",
//                   color: "#1a1a1a",
//                 }}
//               >
//                 {applicationSteps?.applicant_name || "--"}
//               </h3>
//               <p
//                 style={{
//                   margin: "4px 0 2px",
//                   fontSize: "14px",
//                   color: "#666",
//                 }}
//               >
//                 {applicationSteps?.email || "--"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Personal Information */}
//         <div>
//           <h4
//             style={{
//               fontSize: "15px",
//               fontWeight: "600",
//               color: "#332C6A",
//               marginBottom: "16px",
//             }}
//           >
//             Personal Information
//           </h4>

//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//               gap: "12px 24px",
//               fontSize: "14px",
//             }}
//           >
//             <div>
//               <span style={{ color: "#888" }}>Age</span>
//               <p style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}>
//                 {applicationSteps?.age || "--"}
//               </p>
//             </div>

//             <div>
//               <span style={{ color: "#888" }}>Phone</span>
//               <p style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}>
//                 {applicationSteps?.phone || "--"}
//               </p>
//             </div>

//             <div>
//               <span style={{ color: "#888" }}>Degree %</span>
//               <p style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}>
//                 {applicationSteps?.degree_perc
//                   ? `${applicationSteps.degree_perc}%`
//                   : "--"}
//               </p>
//             </div>

//             <div>
//               <span style={{ color: "#888" }}>Plus Two %</span>
//               <p style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}>
//                 {applicationSteps?.plustwo_perc
//                   ? `${applicationSteps.plustwo_perc}%`
//                   : "--"}
//               </p>
//             </div>

//             <div>
//               <span style={{ color: "#888" }}>Intake Year</span>
//               <p style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}>
//                 {applicationSteps?.year_intake || "--"}
//               </p>
//             </div>

//             <div>
//               <span style={{ color: "#888" }}>Passout Year</span>
//               <p style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}>
//                 {applicationSteps?.year_of_pass_out || "--"}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Steps */}
//       <div style={{ padding: "20px" }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignContent: "center",
//           }}
//         >
//           <h4 style={{ fontSize: "16px", fontWeight: "600" }}>Process Steps</h4>

//           <Button
//             variant="outlined"
//             size="small"
//             onClick={handleExpandCollapseAll}
//             sx={{
//               mb: 2,
//               textTransform: "inherit",
//               height: "30px",
//               backgroundColor: "#332C6A",
//               color: "white",
//               fontWeight: "bold",
//             }}
//           >
//             {allExpanded ? "Collapse" : "Expand"}
//           </Button>
//         </div>

//         <Box>
//           <Stepper orientation="vertical" nonLinear>
//             {applicationSteps?.steps?.map((step, index) => (
//               <Step key={step.id} expanded>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     width: "100%",
//                   }}
//                 >
//                   <StepLabel
//                     onClick={() => handleStepClick(index)}
//                     sx={{
//                       cursor: "pointer",
//                       userSelect: "none",
//                       fontWeight: 600,
//                     }}
//                   >
//                     {step.title}
//                     <StyledTooltip
//                       title={
//                         step?.description ? (
//                           <Box>
//                             <strong>Info:</strong>
//                             <Typography
//                               component="div"
//                               sx={{
//                                 mt: 0.5,
//                                 fontWeight: 400,
//                                 fontSize: "12.5px",
//                                 lineHeight: 1.4,
//                                 whiteSpace: "pre-line",
//                               }}
//                             >
//                               {formatTooltipDescription(step.description)}
//                             </Typography>
//                           </Box>
//                         ) : (
//                           "No additional details available"
//                         )
//                       }
//                       placement="top"
//                     >
//                       <InfoIcon
//                         sx={{
//                           fontSize: "16px",
//                           color: "#888",
//                           cursor: "pointer",
//                           transition: "color 0.2s ease",
//                           "&:hover": { color: "#332C6A" },
//                         }}
//                       />
//                     </StyledTooltip>
//                   </StepLabel>

//                   <IconButton
//                     onClick={() => handleMessageClick(step.id, step?.comments)}
//                     size="small"
//                     sx={{
//                       color: "green",
//                       border: "1px solid green",
//                       ml: 1,
//                       "&:hover": {
//                         backgroundColor: "rgba(0,128,0,0.1)",
//                       },
//                     }}
//                   >
//                     <MessageIcon fontSize="small" />
//                   </IconButton>
//                 </div>

//                 {expandedSteps.includes(index) && (
//                   <StepContent>
//                     <div
//                       style={{
//                         display: "flex",
//                         flexWrap: "wrap",
//                         gap: "16px",
//                         justifyContent: "flex-start",
//                       }}
//                     >
//                       {step?.description
//                         ?.match(/\[(.*?)\]/)?.[1]
//                         ?.split(/\s*,\s*/)
//                         ?.map((item, index) => (
//                           <PendingUploadCard
//                             key={index}
//                             name={item.trim()}
//                             id={step?.id}
//                             attachmentName={step?.attachments?.map(
//                               (file) => file
//                             )}
//                           />
//                         ))}
//                     </div>
//                   </StepContent>
//                 )}
//               </Step>
//             ))}
//           </Stepper>
//         </Box>
//       </div>

//       {/* --- Drawer Section --- */}
//       <Drawer
//         anchor="right"
//         open={open}
//         onClose={toggleDrawer(false)}
//         PaperProps={{
//           sx: {
//             width: 380,
//             borderTopLeftRadius: 12,
//             borderBottomLeftRadius: 12,
//           },
//         }}
//       >
//         <CommentBox stepId={selectedStepId} existingComments={stepComments} />
//       </Drawer>
//     </div>
//   );
// }

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
//   IconButton,
//   Tooltip,
//   tooltipClasses,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
// } from "@mui/material";
// import MessageIcon from "@mui/icons-material/Message";
// import CloseIcon from "@mui/icons-material/Close";
// import PendingUploadCard from "../../components/PendingUpload";
// import axiosInstance from "../../config/axiosConfig";
// import { useParams } from "react-router-dom";
// import CommentBox from "../../commentBox";
// import InfoIcon from "@mui/icons-material/Info";
// import { styled } from "@mui/material/styles";

// export default function ApplicationDetail() {
//   const [open, setOpen] = React.useState(false);
//   const [confirmOpen, setConfirmOpen] = React.useState(false); // ✅ New state for confirmation modal
//   const [selectedStepId, setSelectedStepId] = React.useState(null);
//   const [applicationSteps, setApplicationSteps] = React.useState();
//   const [expandedSteps, setExpandedSteps] = React.useState([]);
//   const para = useParams();
//   const [stepComments, setStepComments] = React.useState([]);
//   const [selectedApp, setSelectedApp] = React.useState();

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };

//   const handleMessageClick = (stepId, comm) => {
//     setSelectedStepId(stepId);
//     setStepComments(comm);
//     setOpen(true);
//   };

//   const handleStepClick = (index) => {
//     setExpandedSteps((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
//     );
//   };

//   const getApplicationSteps = () => {
//     axiosInstance
//       .get(`applications/${para?.id}/full-with-responses`)
//       .then((res) => {
//         setApplicationSteps(res?.data?.application);
//         setSelectedApp(res?.data?.application);
//       });
//   };

//   React.useEffect(() => {
//     getApplicationSteps();
//   }, []);

//   const allExpanded = expandedSteps.length === applicationSteps?.steps?.length;

//   const handleExpandCollapseAll = () => {
//     if (expandedSteps.length === applicationSteps?.steps?.length) {
//       setExpandedSteps([]);
//     } else {
//       setExpandedSteps(applicationSteps?.steps?.map((_, index) => index));
//     }
//   };

//   const formatTooltipDescription = (text) => {
//     if (!text) return "";
//     const regex = /\d+\)([^0-9]+)/g;
//     const matches = [...text.matchAll(regex)].map((m) => m[1].trim());
//     const heading = text.split("1)")[0].trim();

//     return (
//       <>
//         {heading && (
//           <Typography component="div" sx={{ mb: 0.5, fontWeight: 600 }}>
//             {heading}
//           </Typography>
//         )}
//         <ol style={{ margin: 0, paddingLeft: "20px" }}>
//           {matches.map((item, i) => (
//             <li key={i} style={{ marginBottom: "4px" }}>
//               {item}
//             </li>
//           ))}
//         </ol>
//       </>
//     );
//   };

//   const StyledTooltip = styled(({ className, ...props }) => (
//     <Tooltip {...props} arrow classes={{ popper: className }} />
//   ))(() => ({
//     [`& .${tooltipClasses.tooltip}`]: {
//       backgroundColor: "gray",
//       color: "#fff",
//       fontSize: "12.5px",
//       fontWeight: 400,
//       padding: "10px 12px",
//       borderRadius: "10px",
//       maxWidth: 320,
//       lineHeight: 1.5,
//       whiteSpace: "pre-line",
//       boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
//     },
//     [`& .${tooltipClasses.arrow}`]: {
//       color: "#2e2574",
//     },
//   }));

//   // ✅ Confirmation modal handlers
//   const handleOpenConfirm = () => setConfirmOpen(true);
//   const handleCloseConfirm = () => setConfirmOpen(false);

//   const handleConfirmComplete = () => {
//     setConfirmOpen(false);
//     console.log("✅ Application marked as complete");
//     axiosInstance.put(`applications/${selectedApp?.id}`, {
//       ...selectedApp,
//       status: "in_progress",
//     });
//   };

//   return (
//     <div style={{ height: "100%" }}>
//       {/* Header */}
//       <div
//         style={{
//           padding: "20px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <h3 style={{ color: "#332C6A" }}>Application</h3>
//       </div>

//       <div
//         style={{
//           backgroundColor: "#fff",
//           borderRadius: "12px",
//           padding: "24px 28px",
//           margin: "20px",
//           boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
//           border: "1px solid #f0f0f0",
//           display: "flex",
//           flexDirection: "column",
//           gap: "24px",
//         }}
//       >
//         {/* Profile Header */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexWrap: "wrap",
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//             <div
//               style={{
//                 backgroundColor: "#332C6A",
//                 width: "70px",
//                 height: "70px",
//                 borderRadius: "50%",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 fontSize: "28px",
//                 fontWeight: "600",
//                 color: "#fff",
//               }}
//             >
//               {applicationSteps?.applicant_name?.charAt(0)?.toUpperCase() ||
//                 "U"}
//             </div>

//             <div>
//               <h3
//                 style={{
//                   margin: 0,
//                   fontSize: "18px",
//                   fontWeight: "700",
//                   color: "#1a1a1a",
//                 }}
//               >
//                 {applicationSteps?.applicant_name || "--"}
//               </h3>
//               <p
//                 style={{
//                   margin: "4px 0 2px",
//                   fontSize: "14px",
//                   color: "#666",
//                 }}
//               >
//                 {applicationSteps?.email || "--"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Personal Information */}
//         <div>
//           <h4
//             style={{
//               fontSize: "15px",
//               fontWeight: "600",
//               color: "#332C6A",
//               marginBottom: "16px",
//             }}
//           >
//             Personal Information
//           </h4>

//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//               gap: "12px 24px",
//               fontSize: "14px",
//             }}
//           >
//             <div>
//               <span style={{ color: "#888" }}>Age</span>
//               <p style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}>
//                 {applicationSteps?.age || "--"}
//               </p>
//             </div>

//             <div>
//               <span style={{ color: "#888" }}>Phone</span>
//               <p style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}>
//                 {applicationSteps?.phone || "--"}
//               </p>
//             </div>

//             <div>
//               <span style={{ color: "#888" }}>Degree %</span>
//               <p style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}>
//                 {applicationSteps?.degree_perc
//                   ? `${applicationSteps.degree_perc}%`
//                   : "--"}
//               </p>
//             </div>

//             <div>
//               <span style={{ color: "#888" }}>Plus Two %</span>
//               <p style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}>
//                 {applicationSteps?.plustwo_perc
//                   ? `${applicationSteps.plustwo_perc}%`
//                   : "--"}
//               </p>
//             </div>

//             <div>
//               <span style={{ color: "#888" }}>Intake Year</span>
//               <p style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}>
//                 {applicationSteps?.year_intake || "--"}
//               </p>
//             </div>

//             <div>
//               <span style={{ color: "#888" }}>Passout Year</span>
//               <p style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}>
//                 {applicationSteps?.year_of_pass_out || "--"}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Steps */}
//       <div style={{ padding: "20px" }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignContent: "center",
//           }}
//         >
//           <h4 style={{ fontSize: "16px", fontWeight: "600" }}>Process Steps</h4>

//           <Button
//             variant="outlined"
//             size="small"
//             onClick={handleExpandCollapseAll}
//             sx={{
//               mb: 2,
//               textTransform: "inherit",
//               height: "30px",
//               backgroundColor: "#332C6A",
//               color: "white",
//               fontWeight: "bold",
//             }}
//           >
//             {allExpanded ? "Collapse" : "Expand"}
//           </Button>
//         </div>

//         <Box>
//           <Stepper orientation="vertical" nonLinear>
//             {applicationSteps?.steps?.map((step, index) => (
//               <Step key={step.id} expanded>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     width: "100%",
//                   }}
//                 >
//                   <StepLabel
//                     onClick={() => handleStepClick(index)}
//                     sx={{
//                       cursor: "pointer",
//                       userSelect: "none",
//                       fontWeight: 600,
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 0.6,
//                       }}
//                     >
//                       {step.title}
//                       <StyledTooltip
//                         title={
//                           step?.description ? (
//                             <Box>
//                               <strong>Info:</strong>
//                               <Typography
//                                 component="div"
//                                 sx={{
//                                   mt: 0.5,
//                                   fontWeight: 400,
//                                   fontSize: "12.5px",
//                                   lineHeight: 1.4,
//                                   whiteSpace: "pre-line",
//                                 }}
//                               >
//                                 {formatTooltipDescription(step.description)}
//                               </Typography>
//                             </Box>
//                           ) : (
//                             "No additional details available"
//                           )
//                         }
//                         placement="top"
//                       >
//                         <InfoIcon
//                           sx={{
//                             fontSize: "14px",
//                             color: "#888",
//                             cursor: "pointer",
//                             transition: "color 0.2s ease",
//                             position: "relative",
//                             top: "0.5px",
//                             "&:hover": { color: "#332C6A" },
//                           }}
//                         />
//                       </StyledTooltip>
//                     </Box>
//                   </StepLabel>

//                   <IconButton
//                     onClick={() => handleMessageClick(step.id, step?.comments)}
//                     size="small"
//                     sx={{
//                       color: "green",
//                       border: "1px solid green",
//                       ml: 1,
//                       "&:hover": {
//                         backgroundColor: "rgba(0,128,0,0.1)",
//                       },
//                     }}
//                   >
//                     <MessageIcon fontSize="small" />
//                   </IconButton>
//                 </div>

//                 {expandedSteps.includes(index) && (
//                   <StepContent>
//                     <div
//                       style={{
//                         display: "flex",
//                         flexWrap: "wrap",
//                         gap: "16px",
//                         justifyContent: "flex-start",
//                       }}
//                     >
//                       <PendingUploadCard
//                         id={step?.id}
//                         attachmentName={step?.attachments}
//                       />
//                     </div>
//                   </StepContent>
//                 )}
//               </Step>
//             ))}
//           </Stepper>
//         </Box>

//         {/* ✅ Sticky Footer with Modal Confirmation */}
//         <div
//           style={{
//             position: "sticky",
//             bottom: 0,
//             // padding: "16px 24px",
//             display: "flex",
//             justifyContent: "flex-end",
//             // boxShadow: "0 -2px 6px rgba(0,0,0,0.1)",
//             zIndex: 1000,
//             marginTop: "100px",
//             // backgroundColor: "white",
//           }}
//         >
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={handleOpenConfirm}
//             sx={{
//               textTransform: "inherit",
//               height: "36px",
//               backgroundColor: "#008000",
//               color: "white",
//               fontWeight: "bold",
//               "&:hover": {
//                 backgroundColor: "#281f5b",
//               },
//             }}
//           >
//             Complete Application
//           </Button>
//         </div>
//       </div>

//       {/* ✅ Confirmation Modal */}
//       <Dialog open={confirmOpen} onClose={handleCloseConfirm} maxWidth="xs">
//         <DialogTitle
//           sx={{
//             fontWeight: 700,
//             color: "#332C6A",
//             fontSize: "16px",
//             fontWeight: "700",
//           }}
//         >
//           Confirm Completion
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ color: "#444", fontSize: "14px" }}>
//             Are you sure you want to mark this application as complete? This
//             action cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={handleCloseConfirm}
//             color="inherit"
//             style={{ textTransform: "inherit" }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleConfirmComplete}
//             variant="contained"
//             sx={{
//               backgroundColor: "#332C6A",
//               "&:hover": { backgroundColor: "#281f5b" },
//               textTransform: "inherit",
//             }}
//           >
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* --- Drawer Section --- */}
//       <Drawer
//         anchor="right"
//         open={open}
//         onClose={toggleDrawer(false)}
//         PaperProps={{
//           sx: {
//             width: 380,
//             borderTopLeftRadius: 12,
//             borderBottomLeftRadius: 12,
//           },
//         }}
//       >
//         <CommentBox stepId={selectedStepId} existingComments={stepComments} />
//       </Drawer>
//     </div>
//   );
// }

import * as React from "react";
import {
  Box,
  Drawer,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  IconButton,
  Tooltip,
  tooltipClasses,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import InfoIcon from "@mui/icons-material/Info";
import PendingUploadCard from "../../components/PendingUpload";
import axiosInstance from "../../config/axiosConfig";
import { useParams } from "react-router-dom";
import CommentBox from "../../commentBox";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useToast } from "../../components/Toast";

export default function ApplicationDetail() {
  const [open, setOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [selectedStepId, setSelectedStepId] = React.useState(null);
  const [applicationSteps, setApplicationSteps] = React.useState();
  const [expandedSteps, setExpandedSteps] = React.useState([]);
  const para = useParams();
  const [stepComments, setStepComments] = React.useState([]);
  const [selectedApp, setSelectedApp] = React.useState();
  const currentRole = localStorage.getItem("role");

  // 🔹 New states for step confirmation
  const [stepConfirmOpen, setStepConfirmOpen] = React.useState(false);
  const [selectedStepToComplete, setSelectedStepToComplete] = React.useState(
    {}
  );
  const { showToast } = useToast();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleMessageClick = (stepId, comm) => {
    setSelectedStepId(stepId);
    setStepComments(comm);
    setOpen(true);
  };

  const handleStepClick = (index) => {
    setExpandedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const getApplicationSteps = () => {
    axiosInstance
      .get(`applications/${para?.id}/full-with-responses`)
      .then((res) => {
        setApplicationSteps(res?.data?.application);
        setSelectedApp(res?.data?.application);
      });
  };

  React.useEffect(() => {
    getApplicationSteps();
  }, []);

  const allExpanded = expandedSteps.length === applicationSteps?.steps?.length;

  const handleExpandCollapseAll = () => {
    if (expandedSteps.length === applicationSteps?.steps?.length) {
      setExpandedSteps([]);
    } else {
      setExpandedSteps(applicationSteps?.steps?.map((_, index) => index));
    }
  };

  // ✅ Tooltip logic
  const formatTooltipDescription = (text) => {
    if (!text) return "";

    const uploadedDocs = new Set(
      applicationSteps?.steps
        ?.flatMap((step) => step?.attachments || [])
        ?.map((att) => {
          if (!att) return "";
          if (typeof att === "string") return att.toLowerCase().trim();
          if (att.name) return att.name.toLowerCase().trim();
          if (att.file_name) return att.file_name.toLowerCase().trim();
          if (att.attachment_name)
            return att.attachment_name.toLowerCase().trim();
          return "";
        }) || []
    );

    // const regex = /\d+\)\s*([^0-9]+)/g;
    // const matches = [...text.matchAll(regex)].map((m) => m[1].trim());
    // const heading = text.split("1)")[0].trim();

    // Capture each numbered item including digits inside the item text.
    // Match "N) <anything until next M) or end-of-string>"
    const regex = /\d+\)\s*([\s\S]*?)(?=\d+\)|$)/g;
    const matches = [...text.matchAll(regex)].map((m) => m[1].trim());

    // If there is any text before the first numbered token, treat that as heading.
    const headingMatch = text.split(/\d+\)/)[0].trim();
    const heading = headingMatch && headingMatch.length ? headingMatch : "";

    return (
      <>
        {heading && (
          <Typography component="div" sx={{ mb: 0.5, fontWeight: 600 }}>
            {heading}
          </Typography>
        )}
        <ol style={{ margin: 0, paddingLeft: "20px" }}>
          {matches.map((item, i) => {
            const normalized = item.toLowerCase();
            const isUploaded = [...uploadedDocs].some((doc) =>
              doc.includes(normalized)
            );

            return (
              <li
                key={i}
                style={{
                  marginBottom: "4px",
                  color: isUploaded ? "#b0b0b0" : "#fff",
                  textDecoration: isUploaded ? "line-through" : "none",
                }}
              >
                {item}
              </li>
            );
          })}
        </ol>
      </>
    );
  };

  const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "gray",
      color: "#fff",
      fontSize: "12.5px",
      fontWeight: 400,
      padding: "10px 12px",
      borderRadius: "10px",
      maxWidth: 320,
      lineHeight: 1.5,
      whiteSpace: "pre-line",
      boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: "#2e2574",
    },
  }));

  const handleOpenConfirm = () => setConfirmOpen(true);
  const handleCloseConfirm = () => setConfirmOpen(false);

  const handleConfirmComplete = () => {
    setConfirmOpen(false);
    axiosInstance
      .put(`applications/${selectedApp?.id}`, {
        status: "completed",
      })
      .then((res) => {
        showToast({
          message: "Application completed successfully!",
          severity: "success",
        });
        getApplicationSteps();
      });
  };

  // 🔹 Handle Step Completion Dialog
  const handleStepCompleteClick = (
    stepId,
    stepTitle,
    countryId,
    step_record_id
  ) => {
    setSelectedStepToComplete({
      id: stepId,
      title: stepTitle,
      cId: countryId,
      step_record_id: step_record_id,
    });
    setStepConfirmOpen(true);
  };

  const handleConfirmStepComplete = () => {
    axiosInstance
      .post(
        `application-steps/${selectedStepToComplete?.step_record_id}/update`,
        {
          status: "completed",
          title: selectedStepToComplete?.title,
        }
      )
      .then(() => {
        showToast({
          message: "Step completed successfully!",
          severity: "success",
        });
        setStepConfirmOpen(false);
        getApplicationSteps();
        setSelectedStepToComplete({});
      });
  };

  const handleCloseStepConfirm = () => setStepConfirmOpen(false);
  const allowedCodes = ["UK", "MT", "SG", "MY"];
  const isAllowedCountryForCounsellor = allowedCodes.includes(
    applicationSteps?.country?.code
  );

  return (
    <div style={{ height: "100%" }}>
      {/* Header */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3 style={{ color: "#332C6A" }}>Application</h3>
      </div>

      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "24px 28px",
          margin: "20px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          border: "1px solid #f0f0f0",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Profile Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                backgroundColor: "#332C6A",
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "28px",
                fontWeight: "600",
                color: "#fff",
              }}
            >
              {applicationSteps?.applicant_name?.charAt(0)?.toUpperCase() ||
                "U"}
            </div>

            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#1a1a1a",
                }}
              >
                {applicationSteps?.applicant_name || "--"}
              </h3>
              <p
                style={{
                  margin: "4px 0 2px",
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                {applicationSteps?.email || "--"}
              </p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div>
          <h4
            style={{
              fontSize: "15px",
              fontWeight: "600",
              color: "#332C6A",
              marginBottom: "16px",
            }}
          >
            Personal Information
          </h4>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px 24px",
              fontSize: "14px",
            }}
          >
            <div>
              <span style={{ color: "#888" }}>Age</span>
              <p style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}>
                {applicationSteps?.age || "--"}
              </p>
            </div>

            <div>
              <span style={{ color: "#888" }}>Phone</span>
              <p style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}>
                {applicationSteps?.phone || "--"}
              </p>
            </div>

            <div>
              <span style={{ color: "#888" }}>Degree %</span>
              <p style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}>
                {applicationSteps?.degree_perc
                  ? `${applicationSteps.degree_perc}%`
                  : "--"}
              </p>
            </div>

            <div>
              <span style={{ color: "#888" }}>Plus Two %</span>
              <p style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}>
                {applicationSteps?.plustwo_perc
                  ? `${applicationSteps.plustwo_perc}%`
                  : "--"}
              </p>
            </div>

            <div>
              <span style={{ color: "#888" }}>Intake Year</span>
              <p style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}>
                {applicationSteps?.year_intake || "--"}
              </p>
            </div>

            <div>
              <span style={{ color: "#888" }}>Passout Year</span>
              <p style={{ margin: "4px 0", fontWeight: "500", color: "#222" }}>
                {applicationSteps?.year_of_pass_out || "--"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <h4 style={{ fontSize: "16px", fontWeight: "600" }}>Process Steps</h4>

          <Button
            variant="outlined"
            size="small"
            onClick={handleExpandCollapseAll}
            sx={{
              mb: 2,
              textTransform: "inherit",
              height: "30px",
              backgroundColor: "#332C6A",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {allExpanded ? "Collapse" : "Expand"}
          </Button>
        </div>

        <Box>
          <Stepper orientation="vertical" nonLinear>
            {(currentRole == "counsellor" && !isAllowedCountryForCounsellor
              ? applicationSteps?.steps?.slice(0, 1)
              : applicationSteps?.steps
            )?.map((step, index) => (
              <Step key={step.id} expanded>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <StepLabel
                    onClick={() => handleStepClick(index)}
                    sx={{
                      cursor: "pointer",
                      userSelect: "none",
                      "& .MuiStepIcon-root": {
                        color: step.status == "completed" ? "#008000" : "",
                      },
                      "& .MuiStepIcon-root.Mui-active": {
                        color: step.status === "completed" ? "#008000" : "",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.6,
                      }}
                    >
                      {step.title}
                      <StyledTooltip
                        title={
                          step?.description ? (
                            <Box>
                              <strong>Info:</strong>
                              <Typography
                                component="div"
                                sx={{
                                  mt: 0.5,
                                  fontWeight: 400,
                                  fontSize: "12.5px",
                                  lineHeight: 1.4,
                                  whiteSpace: "pre-line",
                                }}
                              >
                                {formatTooltipDescription(step.description)}
                              </Typography>
                            </Box>
                          ) : (
                            "No additional details available"
                          )
                        }
                        placement="top"
                      >
                        <InfoIcon
                          sx={{
                            fontSize: "14px",
                            color: "#888",
                            cursor: "pointer",
                            "&:hover": { color: "#332C6A" },
                          }}
                        />
                      </StyledTooltip>
                    </Box>
                  </StepLabel>
                  <div>
                    {step?.status == "open" && (
                      <IconButton
                        onClick={() =>
                          handleStepCompleteClick(
                            step.id,
                            step?.title,
                            applicationSteps?.country?.id,
                            step?.step_record_id
                          )
                        }
                        sx={{
                          color: "green",
                          ml: 1,
                          "&:hover": {
                            backgroundColor: "rgba(0,128,0,0.1)",
                          },
                        }}
                      >
                        <CheckCircleIcon fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() =>
                        handleMessageClick(
                          step?.step_record_id,
                          step?.logs?.map((comment) => comment)
                        )
                      }
                      size="small"
                      sx={{
                        color: "green",
                        ml: 1,
                        "&:hover": { backgroundColor: "rgba(0,128,0,0.1)" },
                      }}
                    >
                      <AddCommentIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>

                {expandedSteps.includes(index) && (
                  <StepContent>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "16px",
                        justifyContent: "flex-start",
                      }}
                    >
                      <PendingUploadCard
                        id={step?.id}
                        attachmentName={step?.logs?.map(
                          (item) => item?.attachments
                        )}
                        status="sss"
                        step_record_id={step?.step_record_id}
                      />
                    </div>
                  </StepContent>
                )}
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Sticky Footer */}
        {selectedApp?.status == "open" && currentRole != "counsellor" && (
          <div
            style={{
              position: "sticky",
              bottom: 0,
              display: "flex",
              justifyContent: "flex-end",
              zIndex: 1000,
              marginTop: "100px",
            }}
          >
            <Button
              variant="outlined"
              size="small"
              onClick={handleOpenConfirm}
              sx={{
                textTransform: "inherit",
                height: "36px",
                backgroundColor: "#008000",
                color: "white",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#281f5b" },
              }}
            >
              Complete Application
            </Button>
          </div>
        )}
      </div>

      {/* Step Completion Confirmation Dialog */}
      <Dialog
        open={stepConfirmOpen}
        onClose={handleCloseStepConfirm}
        maxWidth="xs"
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            color: "#332C6A",
            fontSize: "16px",
          }}
        >
          Complete Step
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#444", fontSize: "14px" }}>
            Do you want to mark this step as complete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseStepConfirm}
            color="inherit"
            style={{ textTransform: "inherit" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmStepComplete}
            variant="contained"
            sx={{
              backgroundColor: "#332C6A",
              "&:hover": { backgroundColor: "#281f5b" },
              textTransform: "inherit",
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Application Completion Confirmation Modal */}
      <Dialog open={confirmOpen} onClose={handleCloseConfirm} maxWidth="xs">
        <DialogTitle
          sx={{
            fontWeight: 700,
            color: "#332C6A",
            fontSize: "16px",
          }}
        >
          Confirm Completion
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#444", fontSize: "14px" }}>
            Are you sure you want to mark this application as complete? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseConfirm}
            color="inherit"
            style={{ textTransform: "inherit" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmComplete}
            variant="contained"
            sx={{
              backgroundColor: "#332C6A",
              "&:hover": { backgroundColor: "#281f5b" },
              textTransform: "inherit",
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Comment Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 380,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
          },
        }}
      >
        <CommentBox
          stepRecordId={selectedStepId}
          existingComments={stepComments}
        />
      </Drawer>
    </div>
  );
}
