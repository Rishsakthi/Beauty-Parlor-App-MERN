import { Typography, Box } from "@mui/material";
import about from "../assets/About.jpg";
import about1 from "../assets/About1.jpg";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  const img1Ref = useRef(null);
  const type1Ref = useRef(null);

  const [visible, setVisible] = useState({
    img1: false,
    type1: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === img1Ref.current) {
            setVisible((prev) => ({
              ...prev,
              img1: entry.isIntersecting,
            }));
          }
          if (entry.target === type1Ref.current) {
            setVisible((prev) => ({
              ...prev,
              type1: entry.isIntersecting,
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    if (img1Ref.current) observer.observe(img1Ref.current);
    if (type1Ref.current) observer.observe(type1Ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Box
        sx={{
          minHeight: { xs: "60vh", md: "500px" },
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(207, 207, 207, 0.2)), 
          url(${about})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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
          About Us
        </Typography>

        <Typography
          variant="h6"
          sx={{
            maxWidth: "600px",
            lineHeight: 1.8,
            fontFamily: "cursive",
            textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
            mt: 2,
            fontSize: { xs: "0.95rem", md: "1.2rem" }
          }}
        >
          At our beauty studio, we believe that true beauty lies in confidence
          and self-care. We are dedicated to providing high-quality salon
          services that enhance your natural elegance while offering a relaxing
          and refreshing experience.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          background: "black"
        }}
      >
        <Box
          ref={img1Ref}
          component="img"
          src={about1}
          sx={{
            width: { xs: "100%", md: "50%" },
            height: { xs: "300px", md: "600px" },
            objectFit: "cover",
            transform: visible.img1 ? "translateX(0)" : "translateX(-100px)",
            opacity: visible.img1 ? 1 : 0,
            transition: "all 0.8s ease",
          }}
        />

        <Box
          ref={type1Ref}
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 3,
            py: { xs: 4, md: 0 },
            transform: visible.type1
              ? "translateX(0px)"
              : "translateX(-100px)",
            opacity: visible.type1 ? 1 : 0,
            transition: "all 0.8s ease",
          }}
        >
         <Box sx={{ maxWidth: "500px" }}>
          <Typography
            component="div"  
            sx={{
              color: "white",
              fontFamily: "cursive",
              lineHeight: 1.8,
              wordSpacing: 2,
              fontSize: { xs: "0.95rem", md: "1rem" }
            }}
          >
            Pamper your feet with our luxurious pedicure service...

            <br /><br />
            We bring together both beauty and bliss...

            <br /><br />
            We envision a space where charisma meets comfort...

            <br /><br />

            <Typography
              component="div" 
              sx={{
                color: "white",
                fontFamily: "cursive",
                lineHeight: 1.8,
                wordSpacing: 2,
              }}
            >
              Pamper your feet...

              <br /><br />

              Why Wait Now{" "}
              <span
                style={{ color: "violet", cursor: "pointer", fontWeight: "bold" }}
                onClick={() => {
                  const token = localStorage.getItem("token");
                  if (!token) navigate("/login");
                  else navigate("/appointmentform");
                }}
              >
                Book
              </span>{" "}
              your Appointment...
            </Typography>
          </Typography>
        </Box>
        </Box>
      </Box>
    </>
  );
}