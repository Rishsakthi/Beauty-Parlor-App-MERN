import { useEffect, useState } from "react";
import { Box, Typography, Paper,Pagination,CircularProgress,FormControl,FormLabel,InputLabel,Select
  ,MenuItem
 } from "@mui/material";
import axios from "axios";

export default function Customers() {
  const [data, setData] = useState([]);
  const[page,setPage]=useState(1);
  const itemsPerPage=10;
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("All");


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
    const cities = [
    "All",
    ...new Set(data.map((s) => s._id))
  ];
  const totalPages=Math.ceil(data.length/itemsPerPage);
  const startIndex=(page-1)*itemsPerPage;
  const endIndex=startIndex+itemsPerPage;
  const currentData=data.slice(startIndex,endIndex);
    const filteredData =
    city === "All"
      ? currentData
      : currentData.filter((s) => s._id=== city);



  return (
    <Box>
      <Typography variant="h5" mb={2}>Customers.....</Typography>
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
      {filteredData.map((c) => (
        <Paper key={c._id} sx={{ p: 2, mb: 1 }}>
          <Typography>
                <b>City:</b> {c._id}
          </Typography>
          <Typography>
                {c.name}
          </Typography>
           <Typography>
                Visits: {c.visits}
          </Typography>
          
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