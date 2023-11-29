import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween";

type Props = {
  title: string;
  sideText?: string;
  subtitle?: string;
  icon?: React.ReactNode;
};

const BoxHeader = ({ icon, title, subtitle, sideText }: Props) => {
  const { palette } = useTheme();
  return (
    <FlexBetween color={palette.grey[900]} margin="1rem 1rem 0 0.5rem">
      <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography color={palette.grey[900]} mb="-0.1rem">
            {title}
          </Typography>
          <Typography variant="h6" color={palette.grey[900]}>{subtitle}</Typography>
        </Box>
      </FlexBetween>
      <Typography variant="h5" fontWeight="700" color={palette.secondary[900]}>
        {sideText}
      </Typography>
    </FlexBetween>
  );
};

export default BoxHeader;