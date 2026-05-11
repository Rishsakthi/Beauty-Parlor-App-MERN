import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Pagination,
  FormControl,
  FormLabel,
  Select,
  MenuItem
} from "@mui/material";

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("Users");
  const [roleFilter, setRoleFilter] = useState("All");

  const itemsPerPage = 7;

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7001/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setUsers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7001/api/admin/frequent",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setCustomers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id, username) => {
    try {
      await axios.delete(
        `http://localhost:7001/api/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert(`${username} Deleted Successfully`);

      fetchUsers();
      fetchCustomers();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCustomers();
  }, []);

  const filteredUsers =
    roleFilter === "All"
      ? users
      : users.filter((u) => u.role === roleFilter);
  const dataToShow =
    view === "Users" ? filteredUsers : customers;
  const totalPages = Math.ceil(
    dataToShow.length / itemsPerPage
  );
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = dataToShow.slice(
    startIndex,
    endIndex
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Manage Users.....
      </Typography>

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
          <Typography>Loading users...</Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
            <FormControl>
              <FormLabel>Select</FormLabel>

              <Select
                value={view}
                onChange={(e) => {
                  setView(e.target.value);
                  setPage(1);
                }}
                sx={{
                  borderRadius: 3,
                  background: "#111",
                  color: "white",
                  minWidth: 200
                }}
              >
                <MenuItem value="Users">Users</MenuItem>
                <MenuItem value="Customer">Customer</MenuItem>
              </Select>
            </FormControl>

            {view === "Users" && (
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Select
                  value={roleFilter}
                  onChange={(e) => {
                    setRoleFilter(e.target.value);
                    setPage(1);
                  }}
                  sx={{
                    borderRadius: 3,
                    background: "#111",
                    color: "white",
                    minWidth: 200
                  }}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="admin">
                    Admin
                  </MenuItem>
                  <MenuItem value="user">
                    User
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>

          {view === "Users" &&
            currentData.map((u) => (
              <Paper
                key={u._id}
                sx={{
                  p: 2,
                  mb: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Box>
                  <Typography>
                    <b>Username:</b> {u.username}
                  </Typography>

                  <Typography>
                    <b>Role:</b> {u.role}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() =>
                    handleDelete(u._id, u.username)
                  }
                >
                  Delete
                </Button>
              </Paper>
            ))}

          {view === "Customer" &&
            currentData.map((a) => (
              <Paper
                key={a._id}
                sx={{
                  p: 2,
                  mb: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Box>
                  <Typography>
                    <b>Customer Name:</b> {a.name}
                  </Typography>

                  <Typography>
                    <b>Visits:</b> {a.visits}
                  </Typography>
                </Box>
              </Paper>
            ))}

          <Box
            display="flex"
            sx={{ justifyContent: "center", mt: 3 }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) =>
                setPage(value)
              }
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
}