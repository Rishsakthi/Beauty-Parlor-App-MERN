import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import beauty from "../assets/beauty.jpg";

export default function Register() {

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {

    if (!form.username.trim() || !form.password.trim()) {
      setError("Username and Password are required");
      setOpen(true);
      return;
    }
    try {
      await axios.post(
        "http://localhost:7001/api/auth/register",
        form
      );
      alert("Registered successfully");
      navigate("/login");

    } catch (err) {

      const message =
        err.response?.data?.message || "Registration failed";

      setError(message);
      setOpen(true);
    }
  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${beauty})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2
      }}
    >
      <Box
        sx={{
          width: 450,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          padding: 5,
          borderRadius: 4,
          background: "rgba(0,0,0,0.85)",
          border: "1px solid #333",
          boxShadow: "0px 0px 20px rgba(0,0,0,0.5)",
          color: "white"
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "white",
            letterSpacing: 1
          }}
        >
          Register
        </Typography>

        <TextField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          fullWidth
          required
          sx={{
            input: {
              color: "white"
            },
            label: {
              color: "#bbb"
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              background: "#111"
            }
          }}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          required
          sx={{
            input: {
              color: "white"
            },
            label: {
              color: "#bbb"
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              background: "#111"
            }
          }}
        />
        <Button
          variant="contained"
          onClick={handleRegister}
          sx={{
            background: "white",
            color: "black",
            borderRadius: "30px",
            py: 1.5,
            fontWeight: "bold",
            fontSize: "16px",

            "&:hover": {
              background: "#ddd"
            }
          }}
        >
          Register
        </Button>
        <Typography
          sx={{
            textAlign: "center",
            color: "#ccc"
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "white",
              fontWeight: "bold",
              textDecoration: "none"
            }}
          >
            Login here
          </Link>
        </Typography>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="error"
            onClose={() => setOpen(false)}
          >
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}