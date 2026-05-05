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
      const res = await axios.post("http://localhost:7001/api/auth/login", form);
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
        {token ? (
          <>
            <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "cursive",
                    textAlign: "center"
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
                    fontFamily: "cursive",
                    borderRadius: "20px"
                  }}
                >
                  Logout
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box >
              <Typography variant="h5" sx={{ fontFamily: "cursive", textAlign: "center" ,mb:5}}>
                Login
              </Typography>

              <TextField sx={{mb:2}}
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

              <Button sx={{mt:2,width:"100%",fontFamily:"cursive"}} variant="contained" onClick={handleLogin}>
                Login
              </Button>

              <Typography variant="h6" sx={{ textAlign: "center", fontFamily: "cursive", mt:2 }}>
                If you don't have an account, <a href="/register">Register here</a>
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}