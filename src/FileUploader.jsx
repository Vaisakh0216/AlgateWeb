import React, { useState, useRef } from "react";

const FileUploader = () => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    console.log("Dropped files:", files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("Selected files:", files);
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const styles = {
    container: {
      width: "100%",
      maxWidth: "600px",
      margin: "40px auto",
      fontFamily: "Arial, sans-serif",
    },
    dropZone: {
      border: "2px dashed rgb(156, 163, 175)",
      borderRadius: "12px",
      padding: "10px",
      textAlign: "center",
      backgroundColor: isDragging ? "#f0f8ff" : "#fff",
      transition: "background-color 0.2s ease-in-out",
    },
    icon: {
      fontSize: "40px",
      color: "#6b7280",
      marginBottom: "2px",
    },
    title: {
      fontWeight: "600",
      fontSize: "16px",
      color: "#111827",
    },
    subtitle: {
      fontSize: "14px",
      color: "#9ca3af",
      marginTop: "4px",
      marginBottom: "10px",
    },
    button: {
      display: "inline-block",
      padding: "8px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      backgroundColor: "#fff",
      color: "#374151",
      fontWeight: "500",
      cursor: "pointer",
    },
    input: {
      display: "none",
    },
  };

  return (
    <div style={styles.container}>
      <div
        style={styles.dropZone}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={triggerFileSelect}
      >
        {/* Icon */}
        <div style={styles.icon}>☁️</div>

        {/* Text */}
        <div style={styles.title}>Choose a file or drag & drop it here</div>
        <div style={styles.subtitle}>
          JPEG, PNG, PDG, and MP4 formats, up to 50MB
        </div>

        {/* Custom "button" */}
        <div style={styles.button}>Browse File</div>

        {/* Hidden Input */}
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          style={styles.input}
        />
      </div>
    </div>
  );
};

export default FileUploader;
