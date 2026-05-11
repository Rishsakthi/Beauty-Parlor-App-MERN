import { Box, Button } from "@mui/material";
import { useNavigate, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh"
      }}
    >

      <Box sx={{ width: 220, bgcolor: "black", color: "white", p: 2 }}>
        <Button fullWidth onClick={() => navigate("/dashboard")}>
          Dashboard
        </Button>


        <Button fullWidth onClick={() => navigate("/dashboard/AdminServices")}>
          Services
        </Button>

      </Box>


      <Box sx={{ flex: 1, p: 3 }}>
        <Outlet />
      </Box>

    </Box>
  );
}