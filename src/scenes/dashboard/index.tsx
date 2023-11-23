import { Box, Typography, useMediaQuery, useTheme  } from '@mui/material';
import Row1 from './Row1';
import { useGetSurveysQuery } from '@/state/api';
// import Row2 from './Row2';
// import Row3 from './Row3';

const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "d e c"
  "d e c"
  "d f f"
  "d f f"
  // "a a a"
  // "a a a"
  // "a a a"
  // "a a a"
  // "b c f"
  // "b c f"
  // "g h i"
  // "g h i"
  // "g h j"
  // "g h j"
`;
const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`;

const Dashboard = () => {
  const { palette } = useTheme();
  const { data: survey } = useGetSurveysQuery();
  console.log('survey',survey)
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box width="100%" height="100%" display="grid" gap="1.5rem"
      sx={
        isAboveMediumScreens ? {
          gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
          gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
          gridTemplateAreas: gridTemplateLargeScreens,
        } : {
          gridAutoColumns: "1fr",
          gridAutoRows: "80px",
          gridTemplateAreas: gridTemplateSmallScreens,
        }
      }
    >        
      {survey?.length == 0 ? 
      <Typography m="0.3rem 0" sx={{
        fontSize: 24,
        color: palette.primary[300]
      }}>
        "Carregue uma pesquisa na aba Upload": 
      </Typography> 
      :
        <Row1 />
      }
    </Box>
  )
}

export default Dashboard