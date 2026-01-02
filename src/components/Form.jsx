// import React, { useState } from "react";
// import {
//   Drawer,
//   FormControl,
//   IconButton,
//   InputLabel,
//   MenuItem,
//   Select,
//   Box,
//   FormControlLabel,
//   Checkbox,
//   TextField,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// /* Drawer Components */
// const Apostille = () => {
//   const [age, setAge] = React.useState("");

//   const handleChange = (e) => {
//     setAge(e.target.value);
//   };

//   const inputStyle = {
//     width: "100%",
//     "& .MuiInputBase-root": {},
//     "& input": {
//       padding: "14px",
//     },
//   };

//   const documentList = [
//     "10th Certificate",
//     "12th Certificate",
//     " Degree Certificate ",
//     "Provisional Certificate ",
//     "Semester Certificate  ( Count )",
//     "Consolidate Certificate",
//     "PCC",
//     "Passport Copy",
//   ];

//   return (
//     <Box>
//       <Box mb={1}>
//         <span style={{ fontSize: "15px", fontWeight: 600 }}>
//           Document Collection
//         </span>
//       </Box>

//       <Box display="flex" gap={1} alignItems="center">
//         <Box width="50%">
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker label="Collected Date" sx={inputStyle} />
//           </LocalizationProvider>
//         </Box>
//         <Box width="50%">
//           <FormControl fullWidth>
//             <InputLabel>Age</InputLabel>
//             <Select
//               value={age}
//               label="Age"
//               onChange={handleChange}
//               sx={inputStyle}
//             >
//               <MenuItem value={10}>Ten</MenuItem>
//               <MenuItem value={20}>Twenty</MenuItem>
//               <MenuItem value={30}>Thirty</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//       </Box>
//       <Box>
//         {documentList.map((checkbox) => (
//           <FormControlLabel
//             control={<Checkbox defaultChecked />}
//             label={checkbox}
//           />
//         ))}
//       </Box>
//       <Box mb={1}>
//         <span style={{ fontSize: "15px", fontWeight: 600 }}>
//           Document Sent To
//         </span>
//         <Box display="flex" gap={1} alignItems="center">
//           <Box width="50%">
//             <FormControl fullWidth>
//               <InputLabel>Sent to</InputLabel>
//               <Select
//                 value={age}
//                 label="Sent Date"
//                 onChange={handleChange}
//                 sx={inputStyle}
//               >
//                 <MenuItem value={10}>Vendor ESC</MenuItem>
//                 <MenuItem value={20}>Agent</MenuItem>
//                 <MenuItem value={30}>via Algate</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>
//           <Box width="50%">
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker label="Sent Date" sx={inputStyle} />
//             </LocalizationProvider>
//           </Box>
//           <Box width="50%">
//             <TextField
//               id="outlined-basic"
//               label="Outlined"
//               variant="outlined"
//             />
//           </Box>
//         </Box>
//         <Box display="flex" gap={1} alignItems="center">
//           <Box width="50%">
//             <FormControl fullWidth>
//               <InputLabel>Sent to</InputLabel>
//               <Select
//                 value={age}
//                 label="Sent Date"
//                 onChange={handleChange}
//                 sx={inputStyle}
//               >
//                 <MenuItem value={10}>Vendor ESC</MenuItem>
//                 <MenuItem value={20}>Agent</MenuItem>
//                 <MenuItem value={30}>via Algate</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>
//           <Box width="50%">
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker label="Sent Date" sx={inputStyle} />
//             </LocalizationProvider>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };
// const PCCApostille2 = () => <div>PCC Aposttille 2 Content</div>;
// const PCCApostille3 = () => <div>PCC Aposttille 3 Content</div>;
// const Translation = () => <div>Translation Content</div>;

// const COMPONENT_MAP = {
//   Apostille: Apostille,
//   "PCC Aposttille 2": PCCApostille2,
//   "PCC Aposttille 3": PCCApostille3,
//   Translation: Translation,
// };

// const items = [
//   { title: "Apostille" },
//   { title: "PCC Aposttille 2" },
//   { title: "PCC Aposttille 3" },
//   { title: "Translation" },
// ];

// function ApostilleForm() {
//   const [open, setOpen] = useState(false);
//   const [selected, setSelected] = useState(null);

//   const SelectedComponent =
//     selected && COMPONENT_MAP[selected.title]
//       ? COMPONENT_MAP[selected.title]
//       : null;

//   return (
//     <>
//       <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//         {items.map((item) => (
//           <div
//             key={item.title}
//             style={{
//               backgroundColor: "white",
//               padding: "12px 16px",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               borderRadius: 6,
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.querySelector("button").style.opacity = 1)
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.querySelector("button").style.opacity = 0)
//             }
//           >
//             <span style={{ color: "#989898" }}>{item.title}</span>

//             <button
//               onClick={() => {
//                 setSelected(item);
//                 setOpen(true);
//               }}
//               style={{
//                 opacity: 0,
//                 transition: "opacity 0.2s",
//                 padding: "6px 12px",
//                 backgroundColor: "#1976d2",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: 4,
//                 cursor: "pointer",
//               }}
//             >
//               Open
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Drawer */}
//       <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
//         <div style={{ width: 600, padding: 20 }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               borderBottom: "1px solid #e0e0e0",
//               paddingBottom: 8,
//               marginBottom: 16,
//             }}
//           >
//             <h2>{selected?.title}</h2>
//             <IconButton onClick={() => setOpen(false)}>
//               <CloseIcon />
//             </IconButton>
//           </div>

//           {/* 🔥 Render Component */}
//           {SelectedComponent && <SelectedComponent />}
//         </div>
//       </Drawer>
//     </>
//   );
// }

// export default ApostilleForm;

import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// IMPORT FORMS
import { Apostille, PCCApostille2, PCCApostille3, Translation } from "./forms";

const COMPONENT_MAP = {
  Apostille,
  "PCC Aposttille 2": PCCApostille2,
  "PCC Aposttille 3": PCCApostille3,
  Translation,
};

const items = [
  { title: "Apostille" },
  { title: "PCC Aposttille 2" },
  { title: "PCC Aposttille 3" },
  { title: "Translation" },
];

function ApostilleMainForm() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const SelectedComponent =
    selected && COMPONENT_MAP[selected.title]
      ? COMPONENT_MAP[selected.title]
      : null;

  const handleOpen = (item) => {
    setSelected(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <>
      {/* ================= LANDING PAGE ================= */}
      <Box>
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} md={6} key={item.title}>
              <Card
                sx={{
                  height: "100%",
                  position: "relative",
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 },
                  "&:hover .open-btn": { opacity: 1 },
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Click to open {item.title} form
                  </Typography>
                </CardContent>

                {/* Hover Button */}
                <Box
                  className="open-btn"
                  sx={{
                    opacity: 0,
                    transition: "opacity 0.25s",
                    px: 2,
                    pb: 2,
                  }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleOpen(item)}
                    style={{ textTransform: "inherit" }}
                  >
                    Open
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ================= DRAWER ================= */}
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Box width={600} p={2}>
          {/* Drawer Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid #e0e0e0"
            pb={1}
            mb={2}
          >
            <Typography variant="h6">{selected?.title}</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Render Selected Form */}
          {SelectedComponent && <SelectedComponent />}
        </Box>
      </Drawer>
    </>
  );
}

export default ApostilleMainForm;
