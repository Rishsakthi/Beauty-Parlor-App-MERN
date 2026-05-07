import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Pagination
} from "@mui/material";

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
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
  const totalPages=Math.ceil(users.length/itemsPerPage);
  const startIndex=(page-1)*itemsPerPage;
  const endIndex=startIndex+itemsPerPage;
  const currentData=users.slice(startIndex,endIndex);


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

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
      >
        Manage Users.....
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
          <Typography>Loading users...</Typography>
        </Box>

      ) : (
        <>
          {currentData.map((u) => (
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
                onClick={() => handleDelete(u._id, u.username)}
              >
                Delete
              </Button>
            </Paper>
          ))}
          <Box display="flex"sx={{justifyContent:"center" ,mt:3}} >
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