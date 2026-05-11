import { useEffect, useState,useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Pagination,
  CircularProgress,
  Button,
  TextField,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import axios from "axios";

const getDateLabel = (appointmentdate) => {
  const apptDate = new Date(appointmentdate);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  apptDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);

  if (apptDate.getTime() === today.getTime()) return "today";
  if (apptDate.getTime() === tomorrow.getTime()) return "tomorrow";
  return "upcoming";
};

const dateColors = {
  today:    { bg: "#fff3e0", border: "#fb8c00", label: "Today" },
  tomorrow: { bg: "#e8f5e9", border: "#43a047", label: "Tomorrow" },
  upcoming: { bg: "#e3f2fd", border: "#1e88e5", label: "Upcoming" },
};

export default function Bookings() {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortOrder,setSortOrder]=useState("asc");
  const [startDate,setStartDate]=useState("");
  const [endDate,setEndDate]=useState("");
  const [city, setCity] = useState("All");

  const itemsPerPage = 3;

  useEffect(() => {
    axios.get("http://localhost:7001/api/appointment/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => {
      setData(res.data);
    })
    .catch(err => console.log(err))
    .finally(() => setLoading(false));
  }, []);
   
 const filteredData = useMemo(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return data
    .filter((b) => {
      const apptDate = new Date(b.appointmentdate);
      if (city !== "All" && b.city !== city) {
        return false;
      }
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        return apptDate >= start && apptDate <= end;
      }
      apptDate.setHours(0, 0, 0, 0);
      return apptDate >= today;
    })
    .sort((a, b) => {
      const dateA = new Date(a.appointmentdate).getTime();
      const dateB = new Date(b.appointmentdate).getTime();
      return sortOrder === "asc"
        ? dateA - dateB
        : dateB - dateA;
    });
  }, [data, sortOrder, startDate, endDate, city]);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex= startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex,endIndex);
  const cities = [
      "All",
      ...new Set(data.map((s) => s.city))
    ];
  return (
    <Box>
      <Typography variant="h5" mb={2}>
        All Bookings.....
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
        sx={{display:"flex",
          justifyContent:"center",
          alignItems:"center",
          height:"300px",
          flexDirection:"column",
          gap:2}}
        >
          <CircularProgress />
          <Typography>Loading bookings...</Typography>
        </Box>
      ) : (
        <>
          <Button 
            variant="outlined" 
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            Sort: {sortOrder === "asc" ? "Oldest First" : "Newest First"}
          </Button>
          <Box  spacing={2} mb={3}>
              FROM             
              <TextField
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              TO
              <TextField
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <Button variant="text" onClick={() => { setStartDate(""); setEndDate(""); }}>
                Reset
              </Button>
            </Box>
          {currentData.map((b) => {
            const label = getDateLabel(b.appointmentdate);
            const colors = dateColors[label];
            return (
              <Paper
                key={b._id}
                sx={{
                  p: 2,
                  mb: 2,
                  backgroundColor: colors.bg,
                  borderLeft: `5px solid ${colors.border}`,
                }}
              >
                <Typography sx={{ color: colors.border, fontWeight: "bold", mb: 1 }}>
                  {colors.label}
                </Typography>

                <Typography><b>Name:</b> {b.name}</Typography>
                <Typography><b>Phone:</b> {b.phone}</Typography>
                <Typography><b>location:</b>{b.city}</Typography>
                <Typography><b>Service:</b> {b.service.join(", ")}</Typography>
                <Typography><b>Occasion:</b> {b.occasion}</Typography>
                <Typography>
                  <b>Date:</b> {new Date(b.appointmentdate).toLocaleDateString()}
                </Typography>
              </Paper>
            );
          })}

          <Box display="flex" sx={{justifyContent:"center"}}  mt={3}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
}