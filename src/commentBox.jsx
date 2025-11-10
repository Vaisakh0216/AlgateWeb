import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axiosInstance from "./config/axiosConfig";

const CommentBox = ({ stepRecordId, existingComments = [] }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  console.log("this is comments 1", comments, newComment);

  // ✅ Load existing comments
  useEffect(() => {
    setComments(existingComments || []);
  }, [existingComments]);

  // ✅ Add new comment
  const handleAddComment = async () => {
    // if (!newComment.trim()) return;
    console.log("this is comments 2", newComment);

    const tempComment = {
      id: Date.now(), // temporary unique ID
      name: "You",
      initials: "Y",
      created_at: "Just now",
      comment: newComment,
    };

    // Optimistic update — show immediately
    setComments((prev) => [tempComment, ...prev]);
    setNewComment("");

    try {
      const res = await axiosInstance.post(
        `application-steps/${stepRecordId}/update`,
        {
          comment: newComment,
        }
      );

      // If backend returns the new comment, replace temp one with real one
      if (res?.record?.logs) {
        setComments((prev) => [
          { ...res?.record?.logs },
          ...prev.filter((c) => c.id !== tempComment.id),
        ]);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      // Roll back if API fails
      setComments((prev) => prev.filter((c) => c.id !== tempComment.id));
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxHeight: "90vh",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          borderBottom: "1px solid #eee",
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontWeight: 600, fontSize: "16px", color: "#332C6A" }}
        >
          Comments
        </Typography>
        <Typography sx={{ fontSize: "13px", color: "#666" }}>
          Step ID: {stepRecordId}
        </Typography>
      </Box>

      {/* Comment List */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        {comments.length === 0 ? (
          <Typography
            sx={{ color: "#888", textAlign: "center", mt: 2, fontSize: "14px" }}
          >
            No comments yet.
          </Typography>
        ) : (
          comments.map(
            (comment) =>
              comment != null && (
                <Box
                  key={comment.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    borderBottom: "1px solid #f3f3f3",
                    paddingBottom: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "#332C6A",
                          width: 28,
                          height: 28,
                          fontSize: "13px",
                        }}
                      >
                        {comment.initials ||
                          comment.name?.charAt(0)?.toUpperCase() ||
                          "U"}
                      </Avatar>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "14px",
                            color: "#222",
                          }}
                        >
                          {comment.name || "Unknown User"}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "#888" }}>
                          {comment.created_at
                            ? new Date(comment.created_at).toLocaleString()
                            : "Just now"}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" sx={{ color: "#888" }} />
                    </IconButton>
                  </Box>

                  <Typography
                    sx={{ fontSize: "14px", color: "#333", ml: "38px" }}
                  >
                    {comment.comment}
                  </Typography>
                </Box>
              )
          )
        )}
      </Box>

      {/* Input Box */}
      <Box
        sx={{
          borderTop: "1px solid #eee",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "#fafafa",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter your comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          size="small"
          sx={{
            backgroundColor: "white",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              "& fieldset": { borderColor: "#ddd" },
              "&:hover fieldset": { borderColor: "#bbb" },
              "&.Mui-focused fieldset": { borderColor: "#332C6A" },
            },
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAddComment();
            }
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#332C6A",
            textTransform: "none",
            borderRadius: "10px",
            px: 3,
            "&:hover": { backgroundColor: "#4b3ea3" },
          }}
          onClick={handleAddComment}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default CommentBox;
