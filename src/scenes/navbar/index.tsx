import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FlexBetween from '@/components/FlexBetween';
import PixIcon from "@mui/icons-material/Pix"
import { Typography, Box, useTheme, Button  } from '@mui/material';

const Navbar = () => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState('dashboard');

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[900]}>
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <PixIcon sx={{ fontSize: "28px" }}/>
        <Typography color={palette.grey[900]} fontSize="16px">Diagnóstico Universitário Empreendedor SEBRAE</Typography>
      </FlexBetween>


      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100]} }}>
          <Link
            to="/dashboard"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit"
            }}
            >
              Dashboard
            </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100]} }}>
          <Link
            to="/ranking"
            onClick={() => setSelected("ranking")}
            style={{
              color: selected === "ranking" ? "inherit" : palette.grey[700],
              textDecoration: "inherit"
            }}
            >
              Ranking
            </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100]} }}>
          <Link
            to="/upload"
            onClick={() => setSelected("upload")}
            style={{
              color: selected === "upload" ? "inherit" : palette.grey[700],
              textDecoration: "inherit"
            }}
            >
              Upload
            </Link>
        </Box>
       
      </FlexBetween>
    </FlexBetween>

  )
}

export default Navbar