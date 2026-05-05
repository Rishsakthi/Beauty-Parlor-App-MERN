import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import axios from "axios";

export default function Customers() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7001/api/admin/frequent", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <Box>
      <Typography variant="h5" mb={2}>Frequent Customers</Typography>

      {data.map((c) => (
        <Paper key={c._id} sx={{ p: 2, mb: 1 }}>
          {c.name} — Visits: {c.visits}
        </Paper>
      ))}
    </Box>
  );
}