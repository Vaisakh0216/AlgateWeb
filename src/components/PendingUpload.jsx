// import React, { useRef, useState } from "react";
// import axiosInstance from "../config/axiosConfig";
// import {
//   Button,
//   TextField,
//   Box,
//   LinearProgress,
//   Typography,
// } from "@mui/material";
// import WarningIcon from "@mui/icons-material/Warning";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// const PendingUploadCard = ({ name, id, attachmentName = [] }) => {
//   const fileInputRef = useRef(null);
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("");
//   const [isRenaming, setIsRenaming] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploading, setUploading] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [error, setError] = useState("");

//   // ✅ Check if the file is already uploaded
//   const uploadedFile = attachmentName.find((file) => file?.file_name === name);
//   const isAlreadyUploaded = !!uploadedFile;

//   // ✅ Handle click
//   const handleFileClick = () => {
//     if (isAlreadyUploaded && uploadedFile?.file_path) {
//       handleDownload(uploadedFile.file_path, uploadedFile.file_name);
//     } else {
//       fileInputRef.current.click();
//     }
//   };

//   // ✅ Handle file selection
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;

//     setFile(selectedFile);
//     setFileName(selectedFile.name);
//     setIsRenaming(true);
//     setUploadProgress(0);
//     setUploadSuccess(false);
//     setError("");
//   };

//   // ✅ Handle upload
//   const handleFileUpload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     const renamedFile = new File([file], fileName, { type: file.type });
//     formData.append("file", renamedFile);

//     try {
//       setUploading(true);
//       setError("");
//       setUploadSuccess(false);

//       const res = await axiosInstance.post(
//         `steps/${id}/attachments`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           onUploadProgress: (e) => {
//             const progress = Math.round((e.loaded * 100) / e.total);
//             setUploadProgress(progress);
//           },
//         }
//       );

//       if (res.status === 200 || res.status === 201) {
//         setUploadSuccess(true);
//       } else {
//         setError("Upload failed, please try again.");
//       }
//     } catch {
//       setError("Error uploading file. Please try again.");
//     } finally {
//       setUploading(false);
//       setIsRenaming(false);
//     }
//   };

//   // ✅ Handle download
//   const handleDownload = (path, fileName) => {
//     const baseURL = "https://algatecrm-api.v-nexus.com/storage/";
//     const fileURL = `${baseURL}${path}`;
//     const link = document.createElement("a");
//     link.href = fileURL;
//     link.download = fileName;
//     link.target = "_blank";
//     link.click();
//   };

//   // ✅ Styles
//   const styles = {
//     card: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//       backgroundColor: isAlreadyUploaded ? "#ecfdf5" : "#eef1f7",
//       borderRadius: "12px",
//       padding: "14px 18px",
//       maxWidth: "340px",
//       border: isAlreadyUploaded ? "1px solid #6ee7b7" : "1px solid #e5e7eb",
//       boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
//       fontFamily: "Inter, sans-serif",
//       cursor: "pointer",
//       transition: "all 0.2s ease-in-out",
//     },
//     iconWrapper: {
//       backgroundColor: "#fff",
//       borderRadius: "8px",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       width: "42px",
//       height: "42px",
//     },
//     icon: {
//       color: isAlreadyUploaded
//         ? "#16a34a"
//         : uploadSuccess
//         ? "#16a34a"
//         : file
//         ? "#2563eb"
//         : "#dc2626",
//       fontSize: "22px",
//     },
//     text: {
//       color: isAlreadyUploaded
//         ? "#065f46"
//         : uploadSuccess
//         ? "#065f46"
//         : file
//         ? "#1e3a8a"
//         : "#991b1b",
//       fontWeight: 500,
//       fontSize: "14px",
//     },
//   };

//   return (
//     <div>
//       {/* Upload Card */}
//       <div style={styles.card} onClick={handleFileClick}>
//         <div style={styles.iconWrapper}>
//           {isAlreadyUploaded ? (
//             <CheckCircleOutlineIcon style={styles.icon} />
//           ) : uploading ? (
//             <CloudUploadIcon style={styles.icon} />
//           ) : uploadSuccess ? (
//             <CheckCircleOutlineIcon style={styles.icon} />
//           ) : (
//             <WarningIcon style={styles.icon} />
//           )}
//         </div>

//         <div style={styles.text}>
//           {isAlreadyUploaded
//             ? `${name} uploaded ✓`
//             : uploadSuccess
//             ? `${fileName} uploaded ✓`
//             : file
//             ? `${fileName} ready to upload`
//             : `${name} pending upload`}
//         </div>

//         {!isAlreadyUploaded && (
//           <input
//             type="file"
//             ref={fileInputRef}
//             style={{ display: "none" }}
//             onChange={handleFileChange}
//           />
//         )}
//       </div>

//       {/* Rename & Upload Section */}
//       {!isAlreadyUploaded && isRenaming && (
//         <Box
//           sx={{ display: "flex", flexDirection: "column", gap: "8px", mt: 2 }}
//         >
//           <TextField
//             size="small"
//             variant="outlined"
//             label="Rename file"
//             value={fileName}
//             onChange={(e) => setFileName(e.target.value)}
//           />
//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Button
//               variant="outlined"
//               color="error"
//               onClick={() => {
//                 setFile(null);
//                 setIsRenaming(false);
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleFileUpload}
//             >
//               Upload
//             </Button>
//           </Box>
//         </Box>
//       )}

//       {/* Upload Progress */}
//       {uploading && (
//         <Box sx={{ mt: 2 }}>
//           <LinearProgress variant="determinate" value={uploadProgress} />
//           <Typography variant="body2" sx={{ mt: 0.5 }}>
//             Uploading... {uploadProgress}%
//           </Typography>
//         </Box>
//       )}

//       {/* Error Message */}
//       {error && (
//         <Typography variant="body2" color="error" sx={{ mt: 1 }}>
//           {error}
//         </Typography>
//       )}
//     </div>
//   );
// };

// export default PendingUploadCard;

import React, { useRef, useState } from "react";
import axiosInstance from "../config/axiosConfig";
import {
  Button,
  TextField,
  Box,
  LinearProgress,
  Typography,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const PendingUploadCard = ({ name, id, attachmentName = [] }) => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState("");

  // ✅ Clean match between name and uploaded file (ignores extension)
  const uploadedFile = attachmentName.find((file) => {
    if (!file?.file_name) return false;
    const baseUploaded = file.file_name.replace(/\.[^/.]+$/, "").toLowerCase();
    const baseCurrent = name.replace(/\.[^/.]+$/, "").toLowerCase();
    return baseUploaded === baseCurrent;
  });

  const isAlreadyUploaded = !!uploadedFile;

  // ✅ Handle click — open file or upload new
  const handleFileClick = () => {
    if (isAlreadyUploaded && uploadedFile?.file_path) {
      handleDownload(uploadedFile.file_path, uploadedFile.file_name);
    } else {
      fileInputRef.current.click();
    }
  };

  // ✅ Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setIsRenaming(true);
    setUploadProgress(0);
    setUploadSuccess(false);
    setError("");
  };

  // ✅ Upload file
  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    const renamedFile = new File([file], fileName, { type: file.type });
    formData.append("file", renamedFile);

    try {
      setUploading(true);
      setError("");
      setUploadSuccess(false);

      const res = await axiosInstance.post(
        `steps/${id}/attachments`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            const progress = Math.round((e.loaded * 100) / e.total);
            setUploadProgress(progress);
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        setUploadSuccess(true);
      } else {
        setError("Upload failed, please try again.");
      }
    } catch {
      setError("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
      setIsRenaming(false);
    }
  };

  // ✅ Download file
  const handleDownload = (path, fileName) => {
    const baseURL = "https://algatecrm-api.v-nexus.com/storage/";
    const fileURL = `${baseURL}${path}`;
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = fileName;
    link.target = "_blank";
    link.click();
  };

  // ✅ Styles
  const styles = {
    card: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      backgroundColor: isAlreadyUploaded ? "#ecfdf5" : "#eef1f7",
      borderRadius: "12px",
      padding: "14px 18px",
      maxWidth: "340px",
      border: isAlreadyUploaded ? "1px solid #6ee7b7" : "1px solid #e5e7eb",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      fontFamily: "Inter, sans-serif",
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
    },
    iconWrapper: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "42px",
      height: "42px",
    },
    icon: {
      color: isAlreadyUploaded
        ? "#16a34a"
        : uploadSuccess
        ? "#16a34a"
        : file
        ? "#2563eb"
        : "#dc2626",
      fontSize: "22px",
    },
    text: {
      color: isAlreadyUploaded
        ? "#065f46"
        : uploadSuccess
        ? "#065f46"
        : file
        ? "#1e3a8a"
        : "#991b1b",
      fontWeight: 500,
      fontSize: "14px",
    },
  };

  return (
    <div>
      {/* Upload Card */}
      <div style={styles.card} onClick={handleFileClick}>
        <div style={styles.iconWrapper}>
          {isAlreadyUploaded ? (
            <CheckCircleOutlineIcon style={styles.icon} />
          ) : uploading ? (
            <CloudUploadIcon style={styles.icon} />
          ) : uploadSuccess ? (
            <CheckCircleOutlineIcon style={styles.icon} />
          ) : (
            <WarningIcon style={styles.icon} />
          )}
        </div>

        <div style={styles.text}>
          {isAlreadyUploaded
            ? `${uploadedFile.file_name} ✓`
            : uploadSuccess
            ? `${fileName} uploaded ✓`
            : file
            ? `${fileName} ready to upload`
            : `${name} pending upload`}
        </div>

        {!isAlreadyUploaded && (
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        )}
      </div>

      {/* Rename & Upload Section */}
      {!isAlreadyUploaded && isRenaming && (
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: "8px", mt: 2 }}
        >
          <TextField
            size="small"
            variant="outlined"
            label="Rename file"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setFile(null);
                setIsRenaming(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFileUpload}
            >
              Upload
            </Button>
          </Box>
        </Box>
      )}

      {/* Upload Progress */}
      {uploading && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            Uploading... {uploadProgress}%
          </Typography>
        </Box>
      )}

      {/* Error Message */}
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default PendingUploadCard;
