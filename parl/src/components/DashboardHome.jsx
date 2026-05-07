import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Paper,
  CircularProgress
} from "@mui/material";

export default function DashboardHome() {

  const [stats, setStats] = useState({
    customers: 0,
    users: 0,
    bookings: 0
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {

      const res = await axios.get(
        "http://localhost:7001/api/admin/dashboardstats",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setStats(res.data);

    } catch (err) {
      console.log(err);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px"
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontFamily: "cursive"
        }}
      >
        Admin Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap"
        }}
      >

        <Paper
          sx={{
            p: 4,
            width: 250,
            textAlign: "center"
          }}
        >
          <Typography variant="h5">
            Customers
          </Typography>

          <Typography
            variant="h3"
            color="primary"
          >
            {stats.customers}
          </Typography>
        </Paper>

  
        <Paper
          sx={{
            p: 4,
            width: 250,
            textAlign: "center"
          }}
        >
          <Typography variant="h5">
            Users
          </Typography>

          <Typography
            variant="h3"
            color="secondary"
          >
            {stats.users}
          </Typography>
        </Paper>


        <Paper
          sx={{
            p: 4,
            width: 250,
            textAlign: "center"
          }}
        >
          <Typography variant="h5">
            Bookings
          </Typography>

          <Typography
            variant="h3"
            color="success"
          >
            {stats.bookings}
          </Typography>
        </Paper>
      </Box>
    </>
  );
}