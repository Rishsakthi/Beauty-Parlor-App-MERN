import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import axios from "axios";

export default function Bookings() {
  const [data, setData] = useState([]);

  useEffect(() => {
  axios.get("http://localhost:7001/api/appointment/all", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
  .then(res => {
    console.log("DATA FROM BACKEND:", res.data); 
    setData(res.data);
  })
  .catch(err => console.log(err));
}, []);

  return (
    <Box>
      <Typography variant="h5" mb={2}>All Bookings</Typography>

      {data.map((b) => (
        <Paper key={b._id} sx={{ p: 2, mb: 2 }}>
          <Typography><b>Name:</b> {b.name}</Typography>
          <Typography><b>Phone:</b> {b.phone}</Typography>
          <Typography><b>Service:</b> {b.service.join(", ")}</Typography>
          <Typography><b>Date:</b> {new Date(b.appointmentdate).toLocaleString()}</Typography>
        </Paper>
      ))}
    </Box>
  );
}