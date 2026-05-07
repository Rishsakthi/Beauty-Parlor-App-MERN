import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Pagination,
  CircularProgress
} from "@mui/material";
import axios from "axios";

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

  const filteredData = data.filter(
    (b) => new Date(b.appointmentdate) > new Date()
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = filteredData.slice(startIndex, endIndex);

  return (

    <Box>

      <Typography variant="h5" mb={2}>
        All Bookings
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
          <Typography>Loading bookings...</Typography>
        </Box>

      ) : (

        <>
          {currentData.map((b) => (

            <Paper key={b._id} sx={{ p: 2, mb: 2 }}>

              <Typography>
                <b>Name:</b> {b.name}
              </Typography>

              <Typography>
                <b>Phone:</b> {b.phone}
              </Typography>

              <Typography>
                <b>Service:</b> {b.service.join(", ")}
              </Typography>

              <Typography>
                <b>Occasion:</b> {b.occasion}
              </Typography>

              <Typography>
                <b>Date:</b>{" "}
                {new Date(b.appointmentdate).toLocaleDateString()}
              </Typography>

            </Paper>

          ))}

          <Box display="flex" justifyContent="center" mt={3}>

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