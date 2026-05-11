import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Booking() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:7001/api/appointment/mybookings", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => {
      setData(res.data);
    })
    .catch(err => console.log(err));
  }, []);
  const handleCancel = async (id) => {
  try {
    await axios.delete(
      `http://localhost:7001/api/appointment/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    setData(data.filter((b) => b._id !== id));
    alert("the booking is deleted successfully");
  } catch (err) {
    console.log(err);
  }
};

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>
        My Bookings
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>              
              <TableCell><b>Phone</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Service</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Time Slot</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="h6">
                    No Bookings Found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((b) => (
                <TableRow key={b._id}>
                  <TableCell>{b.name}</TableCell>
                  <TableCell>{b.phone}</TableCell>
                  <TableCell>{b.email}</TableCell>
                  <TableCell>
                    {b.service.join(", ")}
                  </TableCell>
                  <TableCell>
                    {new Date(b.appointmentdate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        new Date(b.appointmentdate) > new Date(23, 59, 59, 999)
                          ? "Upcoming"
                          : "Completed"
                      }
                      color={
                        new Date(b.appointmentdate) > new Date(23, 59, 59, 999)
                          ? "success"
                          : "error"
                      }
                    />
                  </TableCell>
                  <TableCell>{b.timeslot}</TableCell>
                  <TableCell>
                    {new Date(b.appointmentdate) > new Date(23, 59, 59, 999) ? (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleCancel(b._id)}
                      >
                        Cancel
                      </Button>
                    ):(
                      <>
                      <Button
                      variant="contained"
                      disabled="true">
                        Completed
                      </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>

              ))

            )}

          </TableBody>
        </Table>

      </TableContainer>

    </Box>
  );
}