import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import axios from "axios";

export default function AdminServices() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7001/api/admin/top-services", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <Box>
      <Typography variant="h5" mb={2}>Top Services</Typography>

      {data.map((s) => (
        <Paper key={s._id} sx={{ p: 2, mb: 1 }}>
          {s._id} — Booked {s.count} times
        </Paper>
      ))}
    </Box>
  );
}