import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useGetRankingsQuery, useGetXLSlinesQuery, useGetSurveysQuery } from '@/state/api';
import { GetSurveyResponse, Waves } from '@/state/types';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from "react";
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Sector, BarChart, ReferenceLine, Bar } from 'recharts';
import { v4 as uuidv4 } from "uuid";



const Row1 = () => {
  const { data: ranking } = useGetRankingsQuery();
  const { data: xlsLines } = useGetXLSlinesQuery();
  const { data: survey } = useGetSurveysQuery();
   
  const { palette } = useTheme();
  const pieColors = [palette.primary[100], palette.grey[700], palette.primary[300], palette.grey[500], palette.primary[500], palette.grey[300], palette.primary[700], palette.primary[900]];

  const [rowsDataGrid, setRowsDataGrid] = useState<any>([]);
  const [waves, setWaves] = useState<string[]>([]);
  const [selectedWave, setSelectedWave] = useState<string>('');

  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, numberOfAnswers, university } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={palette.primary[500]}>
          {payload.university}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={palette.primary[500]}
          stroke={palette.primary[700]}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={palette.primary[300]}
          stroke={palette.primary[500]}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={palette.primary[700]} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={palette.grey[300]} stroke={palette.grey[300]} />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={palette.primary[500]}>{`${payload.numberOfAnswers}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill={palette.grey[500]}>
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  useEffect(() => {
    const uniqueWaves = Array.from(new Set(survey?.map((entry) => entry.wave)));
    setWaves(uniqueWaves);
  }, [survey]);

  const handleWaveSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWave(event.target.value);
  };

  const columns: GridColDef[] = [
    {
      field: 'wave',
      headerName: 'Onda',
      width:180,
    },
    {
      field: 'university',
      headerName: 'Instituição',
      width:180,
    },
    {
      field: 'fullName',
      headerName: 'Nome',
      width:180,
    },
    {
      field: 'total',
      headerName: 'Total',
      width:180,
    },
  ];

  const countBy = (arr: any, prop: string) => arr.reduce((prev: { [x: string]: number; }, curr: { [x: string]: string | number; }) => (prev[curr[prop]] = ++prev[curr[prop]] || 1, prev), {});

  function countNumberOfAnswers(survey: GetSurveyResponse[]): { wave: string; Respondentes: number }[] {
    const waveCounts: { [key: string]: number } = {};
  
    // Count the number of answers for each wave
    survey.forEach((entry) => {
      const { wave, rows } = entry;
      const Respondentes = rows.length;
  
      if (waveCounts[wave]) {
        waveCounts[wave] += Respondentes;
      } else {
        waveCounts[wave] = Respondentes;
      }
    });
  
    // Format the result as an array of objects with wave and numberOfAnswers
    const result = Object.entries(waveCounts).map(([wave, Respondentes]) => ({
      wave,
      Respondentes,
    }));
  
    return result;
  }

  function getNumberOfAnswersPerUniversityForWave(survey: GetSurveyResponse[], selectedWave: string): { university: string; numberOfAnswers: number }[] {
    const waveData = survey.filter((entry) => entry.wave === selectedWave);
  
    const universityCounts: { [key: string]: number } = {};
  
    // Count the number of answers per university for the selected wave
    waveData.forEach((entry) => {
      const { university, rows } = entry;
      const numberOfAnswers = rows.length;
  
      if (universityCounts[university]) {
        universityCounts[university] += numberOfAnswers;
      } else {
        universityCounts[university] = numberOfAnswers;
      }
    });
  
    // Format the result as an array of objects with university and numberOfAnswers
    const result = Object.entries(universityCounts).map(([university, numberOfAnswers]) => ({
      university,
      numberOfAnswers,
    }));
  
    return result;
  }

  const countRowsByGender = (survey: GetSurveyResponse[], gender: string) => {
    let rowCount = 0;
  
    survey.forEach((item: { rows: any[]; }) => {
      item.rows.forEach(row => {
        row.forEach((person: { gender: any; }) => {
          if (person.gender === gender) {
            rowCount++;
          }
        });
      });
    });
  
    return rowCount;
  };

  

  const countRowsByGenderAndWave = (survey: GetSurveyResponse[]) => {
    //@ts-ignore
    const genderWaveCounts = [];
  
    survey.forEach(item => {
      const wave = item.wave;
  
      // Check if the wave already exists in the output array
      //@ts-ignore
      const existingWave = genderWaveCounts.find(obj => obj.wave === wave);
  
      if (!existingWave) {
        const counts = {
          wave,
          masculino: 0,
          feminino: 0
        };
  
        item.rows.forEach(row => {
          //@ts-ignore
          row.forEach(person => {
            if (person.gender === 'masculino') {
              counts.masculino++;
            } else if (person.gender === 'feminino') {
              counts.feminino--;
            }
          });
        });
  
        genderWaveCounts.push(counts);
      } else {
        item.rows.forEach(row => {
          //@ts-ignore
          row.forEach(person => {
            if (person.gender === 'masculino') {
              existingWave.masculino++;
            } else if (person.gender === 'feminino') {
              existingWave.feminino--;
            }
          });
        });
      }
    });
    //@ts-ignore
    return genderWaveCounts;
};

const tooltipFormatter = (value: number, name: string) => {
  // Show absolute (positive) values for female data in the tooltip
  return name === 'feminino' ? `${Math.abs(value)}` : value;
};
  
  const wavesData = useMemo(() => {
    if (survey){
      const waveCountObj = countBy(survey, 'wave');
      const waves = Object.keys(waveCountObj);
      const wavesCount = waves.length;
      const lastWave = ( waveCountObj ? (Object.keys(waveCountObj).reduce((a, b) => a > b ? a : b)) : [0]);
      const answersByWave = countNumberOfAnswers(survey);
      const answersPerUniversityForWave = getNumberOfAnswersPerUniversityForWave(survey, selectedWave);

      // Count rows for each gender
      const countMaleRows = countRowsByGender(survey, 'masculino');
      const countFemaleRows = countRowsByGender(survey, 'feminino');
      
      console.log(`Number of rows for males: ${countMaleRows}`);
      console.log(`Number of rows for females: ${countFemaleRows}`);

      const countsByGenderAndWave = countRowsByGenderAndWave(survey);

      console.log(countsByGenderAndWave);
      
      let answersLastWave = 0;
     
      for (let i = 0; i < survey.length; i++) {

        if( survey[i].wave == lastWave ) {
          answersLastWave = answersLastWave + survey[i].rows.length
        }

      }
      
      return {
        waves: waves,
        numberOfWaves: wavesCount,
        lastWave: lastWave,
        answersByWave: answersByWave,
        answersLastWave: answersLastWave,
        answersPerUniversityForWave: answersPerUniversityForWave,
        countsByGenderAndWave: countsByGenderAndWave,
    }
    }
  }, [survey, selectedWave]);  

  const pieData = wavesData?.answersPerUniversityForWave;
  

  function generateRandom() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

  const rankingList = useMemo(() => {
    return (
      ranking &&
      ranking.map(({ fullName, wave, categoryRanking, total, university }) => {
        return {
          id: generateRandom(),
          fullName: fullName,
          wave: wave,
          categoryRanking: categoryRanking,
          total: total,
          university: university
        };
      })
    );
  }, [ranking]);   

  return (
    <>
      {!survey ? "Carregando dados" : 
      
      <><DashboardBox gridArea="a">
          <Box ml="1.5rem" mt="1rem" flexBasis="40%" textAlign="center">
            <Typography sx={{
              fontSize: 64,
              color: palette.primary[300]
            }}>
              {!ranking ? "Carregando" :
                `${ranking.length}`}
            </Typography>
            <Typography m="0.3rem 0" sx={{
              fontSize: 24,
              color: palette.primary[300]
            }}>
              {!wavesData ? "Carregando" :
                `respondentes em ${wavesData.numberOfWaves} ondas`}
            </Typography>
          </Box>
        </DashboardBox><DashboardBox gridArea="b">
            <Box ml="1.5rem" mt="1rem" flexBasis="40%" textAlign="center">
              <Typography sx={{
                fontSize: 64,
                color: palette.primary[300]
              }}>
                {!wavesData ? "Carregando" :
                  `${wavesData.answersLastWave}`}
              </Typography>
              <Typography m="0.3rem 0" sx={{
                fontSize: 24,
                color: palette.primary[300]
              }}>
                {!wavesData ? "Carregando" :
                  `respondentes na última onda (${wavesData.lastWave})`}
              </Typography>
            </Box>
          </DashboardBox><DashboardBox gridArea="c">
            <BoxHeader
              title="Evolução de repondentes por onda"
              subtitle="considerando todas as instituições"
              sideText="" />
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={400}
                data={wavesData?.answersByWave}
                margin={{
                  top: 20,
                  right: 30,
                  left: -10,
                  bottom: 55,
                }}
              >
                <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                <XAxis
                  dataKey="wave"
                  tickLine={false}
                  style={{ fontSize: "10px" }} />
                <YAxis
                  yAxisId="left"
                  tickLine={false}
                  axisLine={false}
                  style={{ fontSize: "10px" }} />

                <Tooltip />

                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="Respondentes"
                  stroke={palette.tertiary[500]} />
              </LineChart>
            </ResponsiveContainer>
          </DashboardBox><DashboardBox gridArea="d">
            <FlexBetween>
              <Box ml="1.5rem" mt="1rem" flexBasis="40%" textAlign="center">
                <BoxHeader title="Repondentes por Instituição por Onda" sideText="" />
              </Box>
              <Box>
                <Typography sx={{
                  fontSize: 14,
                  color: palette.primary[300],
                  mt: "1.5rem",
                  mr: "1.5rem"
                }}>
                  Selecione a onda:
                </Typography>
                <select value={selectedWave} onChange={handleWaveSelection} style={{
                  fontSize: 14,
                  color: palette.primary[100],
                  marginTop: "0.5rem",
                  marginLeft: "1.5rem",
                  background: palette.grey[800]
                }}>
                  <option value="">Selecione</option>
                  {waves.map((wave) => (
                    <option key={wave} value={wave}>
                      {wave}
                    </option>
                  ))}
                </select>
              </Box>
            </FlexBetween>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={300} height={300}>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={pieData}
                  cx="50%"
                  cy="40%"
                  innerRadius={55}
                  outerRadius={100}
                  fill={palette.primary[800]}
                  stroke={palette.grey[900]}
                  dataKey="numberOfAnswers"
                  onMouseEnter={onPieEnter} />
              </PieChart>
            </ResponsiveContainer>
          </DashboardBox>
          <DashboardBox gridArea="f">
          <Box ml="1.5rem" mt="1rem" mb="1rem" flexBasis="40%" textAlign="center">
            <BoxHeader title="Distribuição por sexo" sideText="" />
          </Box>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart
                width={500}
                height={300}
                data={wavesData?.countsByGenderAndWave}
                stackOffset='sign'
                reverseStackOrder={true}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" hide={true}/>
                <YAxis dataKey="wave" type="category"/>
                <Tooltip formatter={tooltipFormatter} />
                <Legend />
                {/* <ReferenceLine x={0} stroke="#000" /> */}
                <Bar dataKey="masculino" fill="#8884d8" stackId="stack" />
                <Bar dataKey="feminino" fill="#82ca9d" stackId="stack" />
              </BarChart>
            </ResponsiveContainer>
          </DashboardBox>
          </>
      }
    </>
  )
}

export default Row1