import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetXLSlinesQuery } from '@/state/api';
import { GetXLSResponse } from "@/state/types";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, Label, YAxis, Tooltip, Legend, Line, ScatterChart, Scatter } from "recharts";

const Predictions = () => {
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: survey } = useGetXLSlinesQuery();

 
  const wavesData = useMemo(() => {
    if (survey){
      
    const questions = Object.keys(survey[0]).filter(key => key.startsWith('question'));
      
    const scatterData = questions.map(question => {
      return survey.map((item, index) => ({
        x: parseInt(question.replace('question', ''), 10),
        //@ts-ignore
        y: item[question],
        //@ts-ignore
        name: item[index].fullName,
        //@ts-ignore
        key: `${item[index].id}-${index}`
      }));
    }).flat();
    console.log("scatterData", scatterData)
    return scatterData;
  }
}, [survey]);

  return (
    <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      <FlexBetween m="1rem 2.5rem" gap="1rem">
        <Box>
          <Typography variant="h3">Revenue and Predictions</Typography>
          <Typography variant="h6">
            charted revenue and predicted revenue based on a simple linear
            regression model
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
          }}
        >
          Show Predicted Revenue for Next Year
        </Button>
      </FlexBetween>
      <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="Question" />
        <YAxis type="number" dataKey="y" name="Answer" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        {wavesData?.map((entry, index) => (
          <Scatter key={entry.key} name={entry.name} data={[entry]} fill={`#${index}`} />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Predictions;