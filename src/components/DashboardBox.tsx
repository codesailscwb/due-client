import { Box } from "@mui/material";
import { styled } from "@mui/system";

const DashboardBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  borderRadius: "0.5rem",
  boxShadow: "0.05rem 0.05rem 0.05rem 0.05rem rgba(18, 10, 143, .8)",
}));

export default DashboardBox;