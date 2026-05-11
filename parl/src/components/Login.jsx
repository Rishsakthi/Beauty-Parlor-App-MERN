import { Box, TextField, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import beauty from "../assets/beauty.jpg";

export default function Login() {

  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    navigate("/login", { replace: true });
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7001/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      setToken(res.data.token);

      if (res.data.role === "admin") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
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
          gap: 2,
          padding: 5,
          borderRadius: 4,
          background: "rgba(0,0,0,0.85)",
          border: "1px solid #333",
          boxShadow: "0px 0px 20px rgba(0,0,0,0.5)",
          color: "white"
        }}
      >
        {token ? (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white"
                }}
              >
                You are logged in
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                sx={{
                  width: "200px",
                  borderRadius: "30px",
                  py: 1.2,
                  fontWeight: "bold"
                }}
              >
                Logout
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  mb: 5,
                  fontWeight: "bold",
                  letterSpacing: 1,
                  color: "white"
                }}
              >
                Login
              </Typography>
              <TextField
                sx={{
                  mb: 3,
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
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                fullWidth
              />
              <TextField
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
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
              />
              <Button
                sx={{
                  mt: 3,
                  width: "100%",
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
                variant="contained"
                onClick={handleLogin}
              >
                Login
              </Button>
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  mt: 3,
                  color: "#ccc"
                }}
              >
                If you don't have an account,{" "}
                <a
                  href="/register"
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textDecoration: "none"
                  }}
                >
                  Register here
                </a>
              </Typography>

            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}