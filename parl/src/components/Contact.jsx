import { Typography, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import contact from "../assets/contact.jpg";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from "@mui/icons-material/Phone";

export default function Contact() {

  const img1Ref = useRef(null);
  const type1Ref = useRef(null);

  const [visible, setVisible] = useState({
    img1: false,
    type1: false
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === img1Ref.current) {
            setVisible((prev) => ({ ...prev, img1: entry.isIntersecting }));
          }
          if (entry.target === type1Ref.current) {
            setVisible((prev) => ({ ...prev, type1: entry.isIntersecting }));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (img1Ref.current) observer.observe(img1Ref.current);
    if (type1Ref.current) observer.observe(type1Ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        background: "black",
        overflow: "hidden"
      }}
    >
      <Box
        ref={img1Ref}
        component="img"
        src={contact}
        sx={{
          width: { xs: "100%", md: "65%" },
          height: { xs: "300px", md: "600px" },
          objectFit: "cover",
          transform: visible.img1 ? "translateX(0)" : "translateX(-100px)",
          opacity: visible.img1 ? 1 : 0,
          transition: "all 0.8s ease"
        }}
      />

      <Box
        ref={type1Ref}
        sx={{
          width: { xs: "100%", md: "35%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: visible.type1 ? "translateX(0px)" : "translateX(100px)",
          opacity: visible.type1 ? 1 : 0,
          transition: "all 0.8s ease",
          color: "white",
          px: 3,
          py: { xs: 4, md: 0 }
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: "400px" }}>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <LocationOnIcon 
            sx={{ color: "white" }} 
            />
            <Typography sx={{ fontFamily: "cursive", 
                fontSize: { xs: "0.9rem", md: "1rem" } }}>
              3/101, Perumal Kovil Street, Silattur(post), Aranthangi(Tk), Pudukkottai(Dt) 614 622
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <PhoneIcon sx={{ color: "white" }} />
            <Typography sx={{ fontFamily: "cursive", 
                fontSize: { xs: "0.9rem", md: "1rem" } }}>
              +91 80725 31832
            </Typography>
          </Box>

        </Box>
      </Box>
    </Box>
  );
}