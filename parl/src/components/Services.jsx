import { Box, Typography } from "@mui/material";
import Service1 from "../assets/Service1.jpg";
import Service2 from "../assets/Service2.jpg";
import Service3 from "../assets/Service3.jpg";

import { useEffect, useRef, useState } from "react";

export default function Services() {
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const type1Ref = useRef(null);
  const type2Ref = useRef(null);
  const type3Ref = useRef(null);

  const [visible, setVisible] = useState({
    img1: false,
    img2: false,
    img3: false,
    type1: false,
    type2: false,
    type3: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === img1Ref.current) {
            setVisible((prev) => ({ ...prev, img1: entry.isIntersecting }));
          }
          if (entry.target === img2Ref.current) {
            setVisible((prev) => ({ ...prev, img2: entry.isIntersecting }));
          }
          if (entry.target === img3Ref.current) {
            setVisible((prev) => ({ ...prev, img3: entry.isIntersecting }));
          }
          if (entry.target === type1Ref.current) {
            setVisible((prev) => ({ ...prev, type1: entry.isIntersecting }));
          }
          if (entry.target === type2Ref.current) {
            setVisible((prev) => ({ ...prev, type2: entry.isIntersecting }));
          }
          if (entry.target === type3Ref.current) {
            setVisible((prev) => ({ ...prev, type3: entry.isIntersecting }));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (img1Ref.current) observer.observe(img1Ref.current);
    if (img2Ref.current) observer.observe(img2Ref.current);
    if (img3Ref.current) observer.observe(img3Ref.current);
    if (type1Ref.current) observer.observe(type1Ref.current);
    if (type2Ref.current) observer.observe(type2Ref.current);
    if (type3Ref.current) observer.observe(type3Ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      sx={{
        background:
          "linear-gradient(rgba(0, 0, 0, 0.86), rgba(23, 20, 20, 0.5))",
          overflow:"hidden"
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Box
          ref={img1Ref}
          component="img"
          src={Service1}
          sx={{
            width: "50%",
            height: "600px",
            objectFit: "cover",
            transform: visible.img1 ? "translateX(0)" : "translateX(-100px)",
            opacity: visible.img1 ? 1 : 0,
            transition: "all 0.8s ease",
          }}
        />

        <Box
          ref={type1Ref}
          sx={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: visible.type1
              ? "translateX(0px)"
              : "translateX(100px)",
            opacity: visible.type1 ? 1 : 0,
            transition: "all 0.8s ease",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontFamily: "cursive",
              wordSpacing: 2,
              maxWidth: "500px",
            }}
          >
            Enhance your look with our professional women’s haircut service,
            tailored to suit your face shape, hair type, and personal style.
            Our experienced stylists offer trendy cuts including layers, step
            cuts, and bobs, ensuring a fresh and confident appearance. The
            service includes consultation, precision cutting, and basic styling
            to give you a polished finish. Step out with a style that reflects
            your personality.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box
          ref={type2Ref}
          sx={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: visible.type2
              ? "translateX(0)"
              : "translateX(-100px)",
            opacity: visible.type2 ? 1 : 0,
            transition: "all 0.8s ease",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontFamily: "cursive",
              wordSpacing: 2,
              maxWidth: "500px",
            }}
          >
            Achieve perfectly shaped eyebrows and smooth skin with our expert
            threading services. Using a gentle cotton thread technique, we
            remove unwanted hair with precision and care. Our service includes
            eyebrow shaping, upper lip, and full-face threading, giving you a
            clean and well-defined look. Safe, hygienic, and suitable for all
            skin types.
          </Typography>
        </Box>

        <Box
          ref={img2Ref}
          component="img"
          src={Service2}
          sx={{
            width: "50%",
            height: "550px",
            objectFit: "cover",
            transform: visible.img2 ? "translateX(0)" : "translateX(100px)",
            opacity: visible.img2 ? 1 : 0,
            transition: "all 0.8s ease",
          }}
        />
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box
          ref={img3Ref}
          component="img"
          src={Service3}
          sx={{
            width: "50%",
            height: "600px",
            objectFit: "cover",
            transform: visible.img3 ? "translateX(0)" : "translateX(-100px)",
            opacity: visible.img3 ? 1 : 0,
            transition: "all 0.8s ease",
          }}
        />

        <Box
          ref={type3Ref}
          sx={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: visible.type3
              ? "translateX(0px)"
              : "translateX(100px)",
            opacity: visible.type3 ? 1 : 0,
            transition: "all 0.8s ease",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontFamily: "cursive",
              wordSpacing: 2,
              maxWidth: "500px",
            }}
          >
            Pamper your feet with our luxurious pedicure service designed to
            refresh and rejuvenate. This treatment includes a soothing foot
            soak, exfoliation, nail trimming and shaping, cuticle care, and a
            relaxing massage. Finish with your choice of nail polish for a
            flawless look. Maintain healthy, soft, and beautiful feet with our
            professional care.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}