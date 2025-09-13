import React from "react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

const CommentInputBox = () => {
  const styles = {
    container: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "24px",
      maxWidth: "800px",
      margin: "40px auto",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.05)",
      fontFamily: "Arial, sans-serif",
    },
    label: {
      fontWeight: "bold",
      marginBottom: "12px",
      fontSize: "16px",
    },
    commentBox: {
      border: "1px solid #3b82f6",
      borderRadius: "8px",
      padding: "16px",
    },
    header: {
      display: "flex",
      alignItems: "center",
      marginBottom: "12px",
    },
    avatar: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      marginRight: "12px",
    },
    userName: {
      fontWeight: "bold",
      fontSize: "14px",
    },
    textArea: {
      width: "100%",
      minHeight: "80px",
      border: "none",
      resize: "none",
      outline: "none",
      fontSize: "14px",
      color: "#111827",
      backgroundColor: "transparent",
      fontFamily: "inherit",
    },
    divider: {
      height: "1px",
      backgroundColor: "#e5e7eb",
      margin: "12px 0",
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    iconGroup: {
      display: "flex",
      gap: "16px",
      color: "#9ca3af",
      fontSize: "16px",
    },
    button: {
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "8px 16px",
      fontSize: "14px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.label}>Comments</div>

      <div style={styles.commentBox}>
        {/* Header */}
        <div style={styles.header}>
          <img
            src="https://i.pravatar.cc/36?img=1"
            alt="avatar"
            style={styles.avatar}
          />
          <div style={styles.userName}>Jishan</div>
        </div>

        {/* Comment Text */}
        <textarea
          placeholder="Write your comment..."
          style={styles.textArea}
          defaultValue={
            "I just tried this recipe and it was amazing! The instructions were clear and easy to follow, and the end result was delicious.\nI will definitely be making this again. Thanks for sharing!"
          }
        />

        <div style={styles.divider}></div>

        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.iconGroup}>
            <FormatBoldIcon />
            <FormatItalicIcon />
            <InsertLinkIcon />
          </div>
          <button style={styles.button}>Comment</button>
        </div>
      </div>
    </div>
  );
};

export default CommentInputBox;
