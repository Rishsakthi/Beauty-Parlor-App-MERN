import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress
} from "@mui/material";
import axios from "axios";

export default function AdminServices() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios.get("http://localhost:7001/api/admin/top-services", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => setData(res.data))
    .catch(err => console.log(err))
    .finally(() => setLoading(false));

  }, []);

  return (

    <Box>

      <Typography variant="h5" mb={2}>
        Top Services
      </Typography>

      {loading ? (

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="300px"
          flexDirection="column"
          gap={2}
        >
          <CircularProgress />
          <Typography>Loading Customers...</Typography>
        </Box>

      ) : (

        <Box>

          {data.map((s) => (
            <Paper key={s._id} sx={{ p: 2, mb: 1 }}>
              {s._id} — Booked {s.count} times
            </Paper>

          ))}

        </Box>

      )}

    </Box>
  );
}