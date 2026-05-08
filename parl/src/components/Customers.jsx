import { useEffect, useState } from "react";
import { Box, Typography, Paper,Pagination,CircularProgress } from "@mui/material";
import axios from "axios";

export default function Customers() {
  const [data, setData] = useState([]);
  const[page,setPage]=useState(1);
  const itemsPerPage=10;
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get("http://localhost:7001/api/admin/frequent", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => setData(res.data))
    .catch(err => console.log(err))
    .finally(()=>setLoading(false));

  }, []);
  
  const totalPages=Math.ceil(data.length/itemsPerPage);
  const startIndex=(page-1)*itemsPerPage;
  const endIndex=startIndex+itemsPerPage;
  const currentData=data.slice(startIndex,endIndex);

  return (
    <Box>
      <Typography variant="h5" mb={2}>Frequent Customers.....</Typography>

      {loading ? (
      
              <Box
                sx={{
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  height:"300px",
                  flexDirection:"column",
                  gap:2
                }}
              >
                <CircularProgress />
                <Typography>Loading Customers...</Typography>
              </Box>
      
            ) :(
              <>
      {currentData.map((c) => (
        <Paper key={c._id} sx={{ p: 2, mb: 1 }}>
          {c.name} — Visits: {c.visits}
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