import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "black",
        color: "white",
        textAlign: "center",
        border:2,
        borderColor:"white",
        borderRadius:2
      }}
    >
      <Typography variant="body1" sx={{
            fontFamily:"cursive"
        }}>
        2026 Beauty Parlor. All rights reserved.
      </Typography>

      <Typography variant="body2" sx={{
            fontFamily:"cursive"
        }}>
        Contact: sakthi@beautyparlor.com
      </Typography>
    </Box>
  );
};

export default Footer;