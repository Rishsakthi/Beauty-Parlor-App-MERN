import { Typography } from "@mui/material";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import beauty from "../assets/beauty.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: { xs: "70vh", md: "500px" },
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
        url(${beauty})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        pt: { xs: 4, md: 5 },
        textAlign: "center",
        color: "white",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: "cursive",
          fontWeight: "bold",
          letterSpacing: 1,
          textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
          fontSize: { xs: "1.6rem", md: "2.2rem" }
        }}
      >
        WelCome To Sakthi's Beauty Parlor
      </Typography>

      <Typography
        variant="h6"
        sx={{
          maxWidth: "600px",
          lineHeight: 1.8,
          color: "#E8F5E9",
          fontFamily: "cursive",
          textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
          mt: 2,
          fontSize: { xs: "0.95rem", md: "1.2rem" }
        }}
      >
        Experience beauty, relaxation, and confidence all in one place.
        At Sakthi's Beauty Parlor, we offer a wide range of professional
        services including skincare, hair styling, and wellness treatments
        tailored just for you. Step in, unwind, and let our experts bring
        out the best version of you.
      </Typography>

      <Button
        variant="contained"
        onClick={() => {
          const token = localStorage.getItem("token");
          if (!token) navigate("/login");
          else navigate("/appointmentform");
        }}
        sx={{
          mt: 4,
          px: { xs: 3, md: 4 },
          py: { xs: 1, md: 1.5 },
          borderRadius: "30px",
          fontWeight: "bold",
          backgroundColor: "#070707",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
          fontSize: { xs: "0.9rem", md: "1rem" },
          "&:hover": {
            backgroundColor: "#635c5c",
            transform: "scale(1.05)"
          }
        }}
      >
        Book Now
      </Button>
    </Box>
  );
}