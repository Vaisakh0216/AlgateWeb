import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import axiosInstance from "../config/axiosConfig";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ New state for loader

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const onSubmit = async () => {
    if (!email || !password) {
      setSnackbarMessage("Email and password are required.");
      setSnackbarOpen(true);
      return;
    }

    if (!validateEmail(email)) {
      setSnackbarMessage("Please enter a valid email address.");
      setSnackbarOpen(true);
      return;
    }

    const credential = { email, password };

    try {
      setLoading(true); // ✅ Start loading
      const res = await axiosInstance.post("login", credential);

      localStorage.setItem("authToken", res?.data?.token);
      localStorage.setItem("userInfo", JSON.stringify(res?.data?.user));
      localStorage.setItem(
        "role",
        res?.data?.user?.sys_role_id == 3
          ? "counsellor"
          : res?.data?.user?.sys_role_id == 4
          ? "processor"
          : "admin"
      );

      const target =
        res?.data?.user?.sys_role_id == 3 ? "/cdashboard" : "/dashboard";

      axiosInstance.get("countries").then((res) => {
        localStorage.setItem("countries", JSON.stringify(res?.data));
      });

      navigate(target, { replace: true });
    } catch (error) {
      const message =
        error?.response?.data?.message || "Login failed. Please try again.";
      setSnackbarMessage(message);
      setSnackbarOpen(true);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "linear-gradient(135deg, #d9edf7 0%, #b3e0f4 100%)",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 320,
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          p: 4,
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            height: 80,
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={Logo} width={150} alt="Logo" />
        </Box>

        {/* Email Field */}
        <TextField
          fullWidth
          placeholder="Email@email.com"
          variant="outlined"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{ sx: { borderRadius: "30px" } }}
          sx={{ mb: 3 }}
        />

        {/* Password Field */}
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="********"
          variant="outlined"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            sx: { borderRadius: "30px" },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 4 }}
        />

        {/* Login Button with Loader */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#004b87",
            borderRadius: "30px",
            py: 1.3,
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#003f73" },
            mb: 2,
          }}
          onClick={onSubmit}
          disabled={loading} // ✅ disable button while loading
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Login"
          )}
        </Button>

        {/* Links */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Button
            variant="text"
            size="small"
            sx={{ textTransform: "none", color: "#004b87" }}
          >
            Forgot Password?
          </Button>
          <Button
            variant="text"
            size="small"
            sx={{ textTransform: "none", color: "#004b87" }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>

      {/* Snackbar for error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
