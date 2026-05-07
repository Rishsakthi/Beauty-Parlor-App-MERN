import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Pagination,
  CircularProgress
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

  const itemsPerPage = 3;

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
    .catch(err => console.log(err))
    .finally(() => setLoading(false));
  }, []);

  const filteredData = data
    .filter((b) => {
      const appointmentDate = new Date(b.appointmentdate);
      const today = new Date();
      appointmentDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      return appointmentDate >= today;
    })
    .sort((a, b) => new Date(a.appointmentdate) - new Date(b.appointmentdate));

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex= startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex,endIndex);

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        All Bookings.....
      </Typography>

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