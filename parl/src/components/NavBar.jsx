import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [open, setOpen] = useState(false);

  const handleProtectedNav = (path) => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    else navigate(path);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "black",
        border: 2,
        borderColor: "white",
        borderRadius: 3
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        
        <Button
          sx={{ fontFamily: "cursive" }}
          color="inherit"
          component={Link}
          to="/"
        >
          Beauty Parlour
        </Button>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/services">Services</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
          <Button color="inherit" onClick={() => handleProtectedNav("/bookings")}>Bookings</Button>

          <Button color="inherit" onClick={() => handleProtectedNav("/appointmentform")}>
            Book
          </Button>

          <Button color="inherit" component={Link} to="/gallery">Gallery</Button>

          {role === "admin" && (
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
          )}

          <IconButton onClick={() => navigate("/login")}>
            <AccountCircleIcon
              sx={{
                fontSize: 34,
                background: role ? "blue" : "white",
                color: role ? "white" : "black",
                borderRadius: "50%"
              }}
            />
          </IconButton>
        </Box>

        <IconButton
          sx={{ display: { xs: "block", md: "none" }, color: "white" }}
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: 250 }} onClick={() => setOpen(false)}>
            <List>
              {["Home", "Services", "About", "Contact", "Gallery"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton component={Link} to={`/${text.toLowerCase() === "home" ? "" : text.toLowerCase()}`}>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}

              <ListItem disablePadding>
                <ListItemButton onClick={() => handleProtectedNav("/appointmentform")}>
                  <ListItemText primary="Book" />
                </ListItemButton>
              </ListItem>

              {role === "admin" && (
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/dashboard">
                    <ListItemText primary="Dashboard" />
                  </ListItemButton>
                </ListItem>
              )}

              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/login")}>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;