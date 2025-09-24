import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = () => {
    localStorage.setItem("role", "Admin");
    navigate("/dashboard");
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
        {/* Logo Placeholder */}
        <Box
          sx={{
            height: 80,
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // bgcolor: "#f0f0f0",
            borderRadius: 2,
          }}
        >
          <img src={Logo} width={150} />
          {/* <Typography variant="h6" color="text.secondary">
            LOGO
          </Typography> */}
        </Box>

        {/* Heading */}
        {/* <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#2b2b6e",
            mb: 2,
            textAlign: "center",
          }}
        >
          Login
        </Typography> */}

        {/* Email */}
        <TextField
          fullWidth
          placeholder="Email@email.com"
          variant="outlined"
          label="Email"
          InputProps={{
            sx: { borderRadius: "30px" },
          }}
          sx={{ mb: 3 }}
        />

        {/* Password */}
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="********"
          variant="outlined"
          label="Password"
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

        {/* Login Button */}
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
          onClick={() => onSubmit()}
        >
          Login
        </Button>

        {/* Optional Links */}
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
    </Box>
  );
}
