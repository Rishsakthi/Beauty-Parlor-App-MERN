import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

import axios from "axios";

export default function AdminServices() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [city, setCity] = useState("All");

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

  const cities = [
    "All",
    ...new Set(data.map((s) => s._id.city))
  ];

  const filteredData =
    city === "All"
      ? data
      : data.filter((s) => s._id.city === city);

  return (

    <Box>
      <Typography variant="h5" mb={2}>
        Top Services......
      </Typography>

      <FormControl sx={{ minWidth: 200, mb: 3 }}>
        <InputLabel>City</InputLabel>

        <Select
          value={city}
          label="City"
          onChange={(e) => setCity(e.target.value)}
        >
          {cities.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading ? (

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
            flexDirection: "column",
            gap: 2
          }}
        >
          <CircularProgress />
          <Typography>Loading Services...</Typography>
        </Box>
      ) : (
        <Box>
          {filteredData.map((s) => (
            <Paper
              key={s._id.city + s._id.service}
              sx={{ p: 2, mb: 1 }}
            >
              <Typography>
                <b>City:</b> {s._id.city}
              </Typography>
              <Typography>
                <b>Service:</b> {s._id.service}
              </Typography>
              <Typography>
                Booked {s.count} times
              </Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}