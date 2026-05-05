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
    try {
      await axios.post("http://localhost:7001/api/auth/register", form);

      alert("Registered successfully");
      navigate("/login");

    } catch (err) {
       const message = err.response?.data?.message || "Registration failed";
      setError(message);
      setOpen(true);
    }
  };

  return (
    <Box
          sx={{
            minHeight: "100vh",
            width: "100%",
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${beauty})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
    <Box
        sx={{
          width: 650,
          margin: "100px auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          background: "white"
        }}
      >
      <Typography variant="h5" sx={{ textAlign: "center", fontFamily: "cursive" }}>
        Register
      </Typography>

      <TextField
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        fullWidth
      />

      <Button variant="contained" sx={{fontFamily:"cursive"}} onClick={handleRegister}>
        Register
      </Button>

      <Typography sx={{ textAlign: "center", fontFamily:"cursive" }}>
        Already have an account?{" "}
        <Link to="/login">Login here</Link>
      </Typography>
      <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="error" onClose={() => setOpen(false)}>
            {error}
          </Alert>
      </Snackbar>
    </Box>
    </Box>
  );
}