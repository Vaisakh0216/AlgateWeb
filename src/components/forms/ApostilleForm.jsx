// import React, { useState } from "react";
// import {
//   Box,
//   TextField,
//   Select,
//   MenuItem,
//   Checkbox,
//   FormControl,
//   InputLabel,
//   FormControlLabel,
//   Button,
//   Typography,
//   Card,
//   CardContent,
//   Divider,
// } from "@mui/material";
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// export default function ApostilleForm() {
//   const [form, setForm] = useState({
//     collectedDate: null,
//     collectedLocation: "",
//     documents: [],
//     sentTo: "",
//     sentDate: null,
//     amountCollected: "",
//     paymentMode: "",
//     apostilleCollectedDate: null,
//     collectedFrom: "",
//     collectedBy: "",
//     verified: false,
//     handoverDate: null,
//     handedOverBy: "",
//     handoverMode: "",
//     studentCollectedDate: null,
//   });

//   const documents = [
//     "10th Certificate",
//     "12th Certificate",
//     "Degree Certificate",
//     "Provisional Certificate",
//     "Semester Certificate",
//     "Consolidated Certificate",
//     "PCC",
//     "Passport Copy",
//   ];

//   const toggleDoc = (doc) => {
//     setForm((prev) => ({
//       ...prev,
//       documents: prev.documents.includes(doc)
//         ? prev.documents.filter((d) => d !== doc)
//         : [...prev.documents, doc],
//     }));
//   };

//   const row = {
//     display: "flex",
//     gap: "16px",
//     flexWrap: "wrap",
//   };

//   const col4 = {
//     flex: "1 1 calc(33.333% - 16px)",
//     minWidth: 260,
//   };

//   const col12 = {
//     flex: "1 1 100%",
//   };

//   const title = (text) => (
//     <Typography variant="subtitle1" fontWeight={600} mb={1.5}>
//       {text}
//     </Typography>
//   );

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Box maxWidth={1000} mx="auto" p={2}>
//         {/* ================= Document Collection ================= */}
//         <Card variant="outlined" sx={{ mb: 2 }}>
//           <CardContent>
//             {title("Document Collection")}

//             <div style={row}>
//               <div style={col4}>
//                 <DatePicker
//                   label="Collected Date"
//                   value={form.collectedDate}
//                   onChange={(v) =>
//                     setForm({ ...form, collectedDate: v })
//                   }
//                   slotProps={{
//                     textField: { size: "small", fullWidth: true },
//                   }}
//                 />
//               </div>

//               <div style={col4}>
//                 <FormControl fullWidth size="small">
//                   <InputLabel id="location-label">
//                     Collected Location
//                   </InputLabel>
//                   <Select
//                     labelId="location-label"
//                     label="Collected Location"
//                     value={form.collectedLocation}
//                     onChange={(e) =>
//                       setForm({
//                         ...form,
//                         collectedLocation: e.target.value,
//                       })
//                     }
//                   >
//                     <MenuItem value="Calicut">Calicut</MenuItem>
//                     <MenuItem value="Kochi">Kochi</MenuItem>
//                     <MenuItem value="Kollom">Kollom</MenuItem>
//                     <MenuItem value="Other">Other</MenuItem>
//                   </Select>
//                 </FormControl>
//               </div>
//             </div>

//             <Divider sx={{ my: 2 }} />

//             <div style={{ display: "flex", flexWrap: "wrap" }}>
//               {documents.map((doc) => (
//                 <div key={doc} style={{ width: "25%", minWidth: 220 }}>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         size="small"
//                         checked={form.documents.includes(doc)}
//                         onChange={() => toggleDoc(doc)}
//                       />
//                     }
//                     label={
//                       <Typography variant="body2">{doc}</Typography>
//                     }
//                   />
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* ================= Sent Details ================= */}
//         <Card variant="outlined" sx={{ mb: 2 }}>
//           <CardContent>
//             {title("Document Sent Details")}

//             <div style={row}>
//               <div style={col4}>
//                 <FormControl fullWidth size="small">
//                   <InputLabel id="sent-to-label">Sent To</InputLabel>
//                   <Select
//                     labelId="sent-to-label"
//                     label="Sent To"
//                     value={form.sentTo}
//                     onChange={(e) =>
//                       setForm({ ...form, sentTo: e.target.value })
//                     }
//                   >
//                     <MenuItem value="Vendor ESC">Vendor ESC</MenuItem>
//                     <MenuItem value="Agent">Agent</MenuItem>
//                     <MenuItem value="Via Algate">Via Algate</MenuItem>
//                   </Select>
//                 </FormControl>
//               </div>

//               <div style={col4}>
//                 <DatePicker
//                   label="Sent Date"
//                   value={form.sentDate}
//                   onChange={(v) => setForm({ ...form, sentDate: v })}
//                   slotProps={{
//                     textField: { size: "small", fullWidth: true },
//                   }}
//                 />
//               </div>

//               <div style={col4}>
//                 <TextField
//                   label="Amount Collected"
//                   fullWidth
//                   size="small"
//                   value={form.amountCollected}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       amountCollected: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div style={col4}>
//                 <FormControl fullWidth size="small">
//                   <InputLabel id="payment-label">
//                     Payment Mode
//                   </InputLabel>
//                   <Select
//                     labelId="payment-label"
//                     label="Payment Mode"
//                     value={form.paymentMode}
//                     onChange={(e) =>
//                       setForm({
//                         ...form,
//                         paymentMode: e.target.value,
//                       })
//                     }
//                   >
//                     <MenuItem value="Cash">Cash</MenuItem>
//                     <MenuItem value="Bank">Bank</MenuItem>
//                     <MenuItem value="UPI">UPI</MenuItem>
//                   </Select>
//                 </FormControl>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* ================= Apostille Status ================= */}
//         <Card variant="outlined" sx={{ mb: 2 }}>
//           <CardContent>
//             {title("Apostilled Document Status")}

//             <div style={row}>
//               <div style={col4}>
//                 <DatePicker
//                   label="Collected Date"
//                   value={form.apostilleCollectedDate}
//                   onChange={(v) =>
//                     setForm({
//                       ...form,
//                       apostilleCollectedDate: v,
//                     })
//                   }
//                   slotProps={{
//                     textField: { size: "small", fullWidth: true },
//                   }}
//                 />
//               </div>

//               <div style={col4}>
//                 <FormControl fullWidth size="small">
//                   <InputLabel id="from-label">
//                     Collected From
//                   </InputLabel>
//                   <Select
//                     labelId="from-label"
//                     label="Collected From"
//                     value={form.collectedFrom}
//                     onChange={(e) =>
//                       setForm({
//                         ...form,
//                         collectedFrom: e.target.value,
//                       })
//                     }
//                   >
//                     <MenuItem value="Vendor ESC">
//                       Vendor ESC
//                     </MenuItem>
//                     <MenuItem value="Agency via Algate">
//                       Agency via Algate
//                     </MenuItem>
//                   </Select>
//                 </FormControl>
//               </div>

//               <div style={col4}>
//                 <TextField
//                   label="Collected By"
//                   fullWidth
//                   size="small"
//                   value={form.collectedBy}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       collectedBy: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//             </div>

//             <FormControlLabel
//               sx={{ mt: 1 }}
//               control={
//                 <Checkbox
//                   size="small"
//                   checked={form.verified}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       verified: e.target.checked,
//                     })
//                   }
//                 />
//               }
//               label={
//                 <Typography variant="body2">
//                   Documents Verified
//                 </Typography>
//               }
//             />
//           </CardContent>
//         </Card>

//         {/* ================= Student Handover ================= */}
//         <Card variant="outlined">
//           <CardContent>
//             {title("Handed Over to Student")}

//             <div style={row}>
//               <div style={col4}>
//                 <DatePicker
//                   label="Handover Date"
//                   value={form.handoverDate}
//                   onChange={(v) =>
//                     setForm({ ...form, handoverDate: v })
//                   }
//                   slotProps={{
//                     textField: { size: "small", fullWidth: true },
//                   }}
//                 />
//               </div>

//               <div style={col4}>
//                 <TextField
//                   label="Handed Over By"
//                   fullWidth
//                   size="small"
//                   value={form.handedOverBy}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       handedOverBy: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div style={col4}>
//                 <FormControl fullWidth size="small">
//                   <InputLabel id="handover-label">
//                     Handover Mode
//                   </InputLabel>
//                   <Select
//                     labelId="handover-label"
//                     label="Handover Mode"
//                     value={form.handoverMode}
//                     onChange={(e) =>
//                       setForm({
//                         ...form,
//                         handoverMode: e.target.value,
//                       })
//                     }
//                   >
//                     <MenuItem value="Courier">Courier</MenuItem>
//                     <MenuItem value="Student">Student</MenuItem>
//                   </Select>
//                 </FormControl>
//               </div>

//               <div style={col4}>
//                 <DatePicker
//                   label="Student Collected Date"
//                   value={form.studentCollectedDate}
//                   onChange={(v) =>
//                     setForm({
//                       ...form,
//                       studentCollectedDate: v,
//                     })
//                   }
//                   slotProps={{
//                     textField: { size: "small", fullWidth: true },
//                   }}
//                 />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* ================= Save ================= */}
//         <Box textAlign="right" mt={3}>
//           <Button
//             variant="contained"
//             sx={{ px: 4, textTransform: "none" }}
//             onClick={() => console.log("Payload:", form)}
//           >
//             Save Apostille Details
//           </Button>
//         </Box>
//       </Box>
//     </LocalizationProvider>
//   );
// }

import React, { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControl,
  InputLabel,
  FormControlLabel,
  Button,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axiosInstance from "../../config/axiosConfig"; // adjust path if needed

export default function ApostilleForm() {
  const [apostilleId, setApostilleId] = useState(null);
  const [loading, setLoading] = useState(false);

  const documents = [
    "10th Certificate",
    "12th Certificate",
    "Degree Certificate",
    "Provisional Certificate",
    "Semester Certificate",
    "Consolidated Certificate",
    "PCC",
    "Passport Copy",
  ];

  const [form, setForm] = useState({
    collectedDate: null,
    collectedLocation: "",
    documents: documents.map((doc) => ({
      label: doc,
      value: false,
    })),
    sent_to: "",
    sent_date: null,
    amount_collected: "",
    payment_mode: "",
    apostille_collected_date: null,
    collected_from: "",
    collected_by: "",
    verified: false,
    handover_date: null,
    handedover_by: "",
    handover_mode: "",
    student_collected_date: null,
  });

  const toggleDoc = (docLabel) => {
    setForm((prev) => ({
      ...prev,
      documents: prev.documents.map((doc) =>
        doc.label === docLabel ? { ...doc, value: !doc.value } : doc
      ),
    }));
  };

  /* ================= API ================= */

  const createApostille = async () => {
    console.log("this is form", form);
    setLoading(true);
    try {
      const res = await axiosInstance.post("/applications/147/services", {
        serviceType: "APOSTILLE",
        form,
      });
      if (res?.data?.apostilleId) {
        setApostilleId(res.data.apostilleId);
      }
    } catch (err) {
      console.error("Create failed", err);
    } finally {
      setLoading(false);
    }
  };

  const updateApostille = async () => {
    if (!apostilleId) return;
    setLoading(true);
    try {
      await axiosInstance.put(`/apostille/${apostilleId}`, form);
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    apostilleId ? updateApostille() : createApostille();
  };

  /* ================= Layout Helpers ================= */

  const row = {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
  };

  const col4 = {
    flex: "1 1 calc(33.333% - 16px)",
    minWidth: 260,
  };

  const title = (text) => (
    <Typography variant="subtitle1" fontWeight={600} mb={1.5}>
      {text}
    </Typography>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box maxWidth={1000} mx="auto" p={2}>
        {/* ================= Document Collection ================= */}
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            {title("Document Collection")}

            <div style={row}>
              <div style={col4}>
                <DatePicker
                  label="Collected Date"
                  value={form.collectedDate}
                  onChange={(v) => setForm({ ...form, collectedDate: v })}
                  slotProps={{
                    textField: { size: "small", fullWidth: true },
                  }}
                />
              </div>

              <div style={col4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Collected Location</InputLabel>
                  <Select
                    label="Collected Location"
                    value={form.collectedLocation}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        collectedLocation: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Calicut">Calicut</MenuItem>
                    <MenuItem value="Kochi">Kochi</MenuItem>
                    <MenuItem value="Kollom">Kollom</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <Divider sx={{ my: 2 }} />

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {form.documents.map((doc) => (
                <FormControlLabel
                  key={doc.label}
                  control={
                    <Checkbox
                      checked={doc.value}
                      onChange={() => toggleDoc(doc.label)}
                    />
                  }
                  label={doc.label}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ================= Sent Details ================= */}
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            {title("Document Sent Details")}

            <div style={row}>
              <div style={col4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Sent To</InputLabel>
                  <Select
                    label="Sent To"
                    value={form.sent_to}
                    onChange={(e) =>
                      setForm({ ...form, sent_to: e.target.value })
                    }
                  >
                    <MenuItem value="Vendor ESC">Vendor ESC</MenuItem>
                    <MenuItem value="Agent">Agent</MenuItem>
                    <MenuItem value="Via Algate">Via Algate</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div style={col4}>
                <DatePicker
                  label="Sent Date"
                  value={form.sent_date}
                  onChange={(v) => setForm({ ...form, sent_date: v })}
                  slotProps={{
                    textField: { size: "small", fullWidth: true },
                  }}
                />
              </div>

              <div style={col4}>
                <TextField
                  label="Amount Collected"
                  fullWidth
                  size="small"
                  value={form.amount_collected}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      amount_collected: e.target.value,
                    })
                  }
                />
              </div>

              <div style={col4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Payment Mode</InputLabel>
                  <Select
                    label="Payment Mode"
                    value={form.payment_mode}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        payment_mode: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Cash">Cash</MenuItem>
                    <MenuItem value="Bank">Bank</MenuItem>
                    <MenuItem value="UPI">UPI</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================= Apostille Status ================= */}
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            {title("Apostilled Document Status")}

            <div style={row}>
              <div style={col4}>
                <DatePicker
                  label="Collected Date"
                  value={form.apostille_collected_date}
                  onChange={(v) =>
                    setForm({
                      ...form,
                      apostille_collected_date: v,
                    })
                  }
                  slotProps={{
                    textField: { size: "small", fullWidth: true },
                  }}
                />
              </div>

              <div style={col4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Collected From</InputLabel>
                  <Select
                    label="Collected From"
                    value={form.collected_from}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        collected_from: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Vendor ESC">Vendor ESC</MenuItem>
                    <MenuItem value="Agency via Algate">
                      Agency via Algate
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div style={col4}>
                <TextField
                  label="Collected By"
                  fullWidth
                  size="small"
                  value={form.collected_by}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      collected_by: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <FormControlLabel
              sx={{ mt: 1 }}
              control={
                <Checkbox
                  size="small"
                  checked={form.verified}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      verified: e.target.checked,
                    })
                  }
                />
              }
              label={
                <Typography variant="body2">Documents Verified</Typography>
              }
            />
          </CardContent>
        </Card>

        {/* ================= Student Handover ================= */}
        <Card variant="outlined">
          <CardContent>
            {title("Handed Over to Student")}

            <div style={row}>
              <div style={col4}>
                <DatePicker
                  label="Handover Date"
                  value={form.handover_date}
                  onChange={(v) => setForm({ ...form, handover_date: v })}
                  slotProps={{
                    textField: { size: "small", fullWidth: true },
                  }}
                />
              </div>

              <div style={col4}>
                <TextField
                  label="Handed Over By"
                  fullWidth
                  size="small"
                  value={form.handedover_by}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      handedover_by: e.target.value,
                    })
                  }
                />
              </div>

              <div style={col4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Handover Mode</InputLabel>
                  <Select
                    label="Handover Mode"
                    value={form.handover_mode}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        handover_mode: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Courier">Courier</MenuItem>
                    <MenuItem value="Student">Student</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div style={col4}>
                <DatePicker
                  label="Student Collected Date"
                  value={form.student_collected_date}
                  onChange={(v) =>
                    setForm({
                      ...form,
                      student_collected_date: v,
                    })
                  }
                  slotProps={{
                    textField: { size: "small", fullWidth: true },
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================= Save ================= */}
        <Box textAlign="right" mt={3}>
          <Button
            variant="contained"
            disabled={loading}
            sx={{ px: 4, textTransform: "none" }}
            onClick={handleSave}
          >
            {loading ? "Saving..." : "Save Apostille Details"}
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
