import React from "react";
// import { FiTrash2, FiCheckCircle } from "react-icons/fi";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const FilePreviewCard = () => {
  const styles = {
    card: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#f7f9fc",
      borderRadius: "12px",
      padding: "10px",
      maxWidth: "250px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      fontFamily: "Arial, sans-serif",
      position: "relative",
    },
    fileIconWrapper: {
      position: "relative",
      marginRight: "10px",
    },
    fileIcon: {
      width: "38px",
      height: "50px",
      backgroundColor: "#e5e7eb",
      borderRadius: "8px",
      position: "relative",
    },
    pdfBadge: {
      position: "absolute",
      top: "-6px",
      left: "-6px",
      backgroundColor: "#e11d48",
      color: "white",
      fontSize: "10px",
      padding: "2px",
      borderRadius: "6px",
      fontWeight: "bold",
    },
    foldedCorner: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "12px",
      height: "12px",
      backgroundColor: "#d1d5db",
      clipPath: "polygon(100% 0, 0 0, 100% 100%)",
    },
    fileDetails: {
      flexGrow: 1,
    },
    fileName: {
      fontWeight: "600",
      fontSize: "14px",
      color: "#111827",
      marginBottom: "4px",
    },
    fileSize: {
      fontSize: "12px",
      color: "#6b7280",
    },
    status: {
      display: "flex",
      alignItems: "center",
      fontSize: "12px",
      marginTop: "4px",
      color: "#10b981", // green
    },
    checkIcon: {
      marginRight: "4px",
    },
    deleteIcon: {
      cursor: "pointer",
      color: "#6b7280",
    },
  };

  return (
    <div style={styles.card}>
      {/* File icon with PDF badge */}
      <div style={styles.fileIconWrapper}>
        <div style={styles.fileIcon}>
          <div style={styles.foldedCorner}></div>
        </div>
        <div style={styles.pdfBadge}>PDF</div>
      </div>

      {/* File details */}
      <div style={styles.fileDetails}>
        <div style={styles.fileName}>Degree Certificate</div>
        <div style={styles.fileSize}>94 KB of 94 KB</div>
        <div style={styles.status}>
          <CheckCircleIcon fontSize="small" style={styles.checkIcon} />
          Completed
        </div>
      </div>

      {/* Delete icon */}
      <DeleteIcon fontSize="small" style={styles.deleteIcon} />
    </div>
  );
};

export default FilePreviewCard;
