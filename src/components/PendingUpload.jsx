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

//   // ✅ Clean match between name and uploaded file (ignores extension)
//   const uploadedFile = attachmentName.find((file) => {
//     if (!file?.file_name) return false;
//     const baseUploaded = file.file_name.replace(/\.[^/.]+$/, "").toLowerCase();
//     const baseCurrent = name.replace(/\.[^/.]+$/, "").toLowerCase();
//     return baseUploaded === baseCurrent;
//   });

//   const isAlreadyUploaded = !!uploadedFile;

//   // ✅ Handle click — open file or upload new
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

//   // ✅ Upload file
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

//   // ✅ Download file
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
//             ? `${uploadedFile.file_name} ✓`
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

import React, { useRef, useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";
import {
  Button,
  TextField,
  Box,
  LinearProgress,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const PendingUploadCard = ({
  id,
  attachmentName = [],
  status,
  step_record_id,
}) => {
  console.log("attachmentName", attachmentName);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState("");

  console.log("the app status", file, fileName);

  // ✅ Local attachments for instant UI updates
  const [localAttachments, setLocalAttachments] = useState(attachmentName);

  // ✅ Keep local attachments in sync if parent updates
  useEffect(() => {
    if (attachmentName.length) {
      setLocalAttachments(attachmentName);
    }
  }, [attachmentName]);

  // ✅ Download file
  const handleDownload = (path, fileName) => {
    console.log("sssss", path, fileName);
    const baseURL = "https://algatecrm-api.v-nexus.com";
    const fileURL = `${baseURL}${path}`;
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = fileName;
    link.target = "_blank";
    link.click();
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
    formData.append("name", renamedFile);
    formData.append("attachments[]", renamedFile);

    console.log("formData------>", formData);

    try {
      setUploading(true);
      setError("");
      setUploadSuccess(false);

      const res = await axiosInstance.post(
        `application-steps/${step_record_id}/update`,
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

        // ✅ Optimistically add new uploaded file to localAttachments
        const newFile = {
          id: Date.now(), // temporary ID for UI
          file_name: fileName,
          file_path: res?.data?.file_path || "", // use API response path if available
        };
        setLocalAttachments((prev) => [...prev, newFile]);
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

  console.log("localAtta", localAttachments);

  // ✅ Styles
  const styles = {
    container: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      alignItems: "flex-start",
    },
    card: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      backgroundColor: "#ecfdf5",
      borderRadius: "10px",
      padding: "14px 16px",
      width: "300px", // ✅ Fixed width
      border: "1px solid #6ee7b7",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
      fontFamily: "Inter, sans-serif",
      cursor: "pointer",
      transition: "transform 0.2s ease-in-out",
    },
    iconWrapper: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "38px",
      height: "38px",
      flexShrink: 0,
    },
    icon: {
      color: "#16a34a",
      fontSize: "22px",
    },
    text: {
      color: "#065f46",
      fontWeight: 500,
      fontSize: "14px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    uploadButton: {
      height: "65px",
      width: "335px", // ✅ Fixed width same as cards
      borderRadius: "10px",
      textTransform: "none",
    },
  };

  return (
    <div>
      {/* ✅ Uploaded Files + Upload Button in One Flex Row */}
      <Box sx={styles.container}>
        {/* Upload New File (first position) */}
        <Button
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          sx={styles.uploadButton}
          onClick={() => fileInputRef.current.click()}
        >
          Upload New File
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* ✅ Uploaded File Cards */}
        {localAttachments.flat().map((fileObj, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() => handleDownload(fileObj.url, fileObj.file_name)}
          >
            <div style={styles.iconWrapper}>
              <CheckCircleOutlineIcon style={styles.icon} />
            </div>
            <div style={styles.text}>{`${fileObj.file_name} ✓`}</div>
          </div>
        ))}
      </Box>

      {/* ✅ Rename & Upload Section */}
      {isRenaming && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            mt: 2,
            width: "300px",
          }}
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

      {/* ✅ Upload Progress */}
      {uploading && (
        <Box sx={{ mt: 2, width: "300px" }}>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            Uploading... {uploadProgress}%
          </Typography>
        </Box>
      )}

      {/* ✅ Error Message */}
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default PendingUploadCard;

// import React, { useRef, useState, useEffect } from "react";
// import axiosInstance from "../config/axiosConfig";
// import {
//   Box,
//   Button,
//   Typography,
//   LinearProgress,
//   TextField,
// } from "@mui/material";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import CloseIcon from "@mui/icons-material/Close";

// const PendingUploadCard = ({ id, attachmentName = [] }) => {
//   const fileInputRef = useRef(null);
//   const dropRef = useRef(null);

//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("");
//   const [isRenaming, setIsRenaming] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploading, setUploading] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [error, setError] = useState("");
//   const [localAttachments, setLocalAttachments] = useState(attachmentName);

//   useEffect(() => {
//     setLocalAttachments(attachmentName);
//   }, [attachmentName]);

//   // ✅ Drag & Drop
//   const handleDragOver = (e) => {
//     e.preventDefault();
//     dropRef.current.style.background = "#e0f2fe";
//   };

//   const handleDragLeave = () => {
//     dropRef.current.style.background = "transparent";
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     dropRef.current.style.background = "transparent";
//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile) {
//       setFile(droppedFile);
//       setFileName(droppedFile.name);
//       setIsRenaming(true);
//       setUploadProgress(0);
//       setError("");
//     }
//   };

//   // ✅ Download
//   const handleDownload = (path, fileName) => {
//     const baseURL = "https://algatecrm-api.v-nexus.com/storage/";
//     const fileURL = `${baseURL}${path}`;
//     const link = document.createElement("a");
//     link.href = fileURL;
//     link.download = fileName;
//     link.target = "_blank";
//     link.click();
//   };

//   // ✅ File Input
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;
//     setFile(selectedFile);
//     setFileName(selectedFile.name);
//     setIsRenaming(true);
//     setUploadProgress(0);
//     setError("");
//   };

//   // ✅ Upload File
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
//         const newFile = {
//           id: Date.now(),
//           file_name: fileName,
//           file_path: res?.data?.file_path || "",
//           file_type: file.type,
//         };
//         setLocalAttachments((prev) => [...prev, newFile]);
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

//   // ✅ Remove File
//   const handleRemove = (fileName) => {
//     setLocalAttachments((prev) =>
//       prev.filter((file) => file.file_name !== fileName)
//     );
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         backgroundColor: "transparent",
//         width: "100%",
//         borderRadius: "10px",
//         p: 0,
//         boxShadow: "none",
//         alignItems: "stretch",
//       }}
//     >
//       {/* ✅ Left: Drag & Drop Area */}
//       <Box
//         ref={dropRef}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         sx={{
//           flex: 1,
//           minHeight: "350px",
//           backgroundColor: "transparent",
//           border: "2px dashed #3b82f6",
//           borderRadius: "12px",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           transition: "background 0.3s ease",
//         }}
//       >
//         <CloudUploadIcon sx={{ fontSize: 64, color: "#2563eb", mb: 2 }} />
//         <Typography
//           variant="h6"
//           color="text.primary"
//           sx={{ fontWeight: 500, mb: 1 }}
//         >
//           Drag and Drop file
//         </Typography>
//         <Typography
//           variant="body2"
//           color="text.secondary"
//           sx={{ mb: 2, fontWeight: 400 }}
//         >
//           or
//         </Typography>
//         <Button
//           variant="contained"
//           sx={{
//             backgroundColor: "#2563eb",
//             textTransform: "none",
//             px: 4,
//             py: 1,
//             borderRadius: "6px",
//           }}
//           onClick={() => fileInputRef.current.click()}
//         >
//           Browse
//         </Button>
//         <input
//           type="file"
//           ref={fileInputRef}
//           style={{ display: "none" }}
//           onChange={handleFileChange}
//         />
//       </Box>

//       {/* ✅ Right: File List */}
//       <Box
//         sx={{
//           flex: 1,
//           pl: 4,
//           display: "flex",
//           flexDirection: "column",
//           gap: 1.5,
//           maxHeight: "400px",
//           overflowY: "auto",
//         }}
//       >
//         {localAttachments.length === 0 && (
//           <Typography
//             color="text.secondary"
//             align="center"
//             sx={{ mt: 3, fontStyle: "italic" }}
//           >
//             No files uploaded yet
//           </Typography>
//         )}

//         {localAttachments.map((fileObj) => (
//           <Box
//             key={fileObj.id || fileObj.file_name}
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               p: 1.5,
//               borderRadius: "10px",
//               border: "1px solid #e5e7eb",
//               backgroundColor: "#f8fafc",
//               "&:hover": { backgroundColor: "#f1f5f9" },
//               transition: "0.2s",
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//               <InsertDriveFileIcon sx={{ color: "#2563eb", fontSize: 32 }} />
//               <Box>
//                 <Typography
//                   variant="body1"
//                   sx={{ fontWeight: 500, color: "#111827" }}
//                 >
//                   {fileObj.file_name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {fileObj.file_type || "File"}
//                 </Typography>
//               </Box>
//             </Box>

//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <CheckCircleOutlineIcon sx={{ color: "#16a34a" }} />
//               <CloseIcon
//                 sx={{
//                   color: "#9ca3af",
//                   fontSize: 20,
//                   cursor: "pointer",
//                   "&:hover": { color: "#ef4444" },
//                 }}
//                 onClick={() => handleRemove(fileObj.file_name)}
//               />
//             </Box>
//           </Box>
//         ))}

//         {uploading && (
//           <Box sx={{ mt: 2 }}>
//             <LinearProgress variant="determinate" value={uploadProgress} />
//             <Typography variant="body2" sx={{ mt: 0.5 }}>
//               Uploading... {uploadProgress}%
//             </Typography>
//           </Box>
//         )}

//         {error && (
//           <Typography variant="body2" color="error" sx={{ mt: 1 }}>
//             {error}
//           </Typography>
//         )}
//       </Box>

//       {/* ✅ Rename Popup */}
//       {isRenaming && (
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             background: "#fff",
//             p: 3,
//             borderRadius: "10px",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             width: "300px",
//           }}
//         >
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Rename File
//           </Typography>
//           <TextField
//             size="small"
//             variant="outlined"
//             fullWidth
//             label="File name"
//             value={fileName}
//             onChange={(e) => setFileName(e.target.value)}
//             sx={{ mb: 2 }}
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
//             <Button variant="contained" onClick={handleFileUpload}>
//               Upload
//             </Button>
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default PendingUploadCard;
