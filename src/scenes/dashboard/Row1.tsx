import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useGetRankingsQuery, useGetXLSlinesQuery, useGetSurveysQuery } from '@/state/api';
import { GetSurveyResponse, Waves } from '@/state/types';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { XLS } from '../../state/types';
import { 
  CartesianGrid, 
  Cell, 
  Legend, 
  Line, 
  LineChart, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis, 
  Sector, 
  BarChart, 
  ReferenceLine, 
  Bar, 
  ScatterChart,
  ZAxis,
  Scatter
} from 'recharts';

interface Wave {
  wave: string;
}

interface Person {
  fullName: string;
  age: number;
}

interface Props {
  person: Person;
  waveInfo: Wave;
}

interface Row {
  fullName: string;
  age: string;
}

interface Wave {
  wave: string;
  rows: Row[];
}

interface AgeGroup {
  ageGroup: string;
  index: number;
  count: number;
}

interface AgeGroupStats {
  [key: string]: AgeGroup[];
}

const ageGroups: AgeGroup[] = [
  { ageGroup: "<= 20", index: 1, count: 0 },
  { ageGroup: "21-25", index: 2, count: 0 },
  { ageGroup: "26-30", index: 3, count: 0 },
  { ageGroup: "31-35", index: 4, count: 0 },
  { ageGroup: "36-40", index: 5, count: 0 },
  { ageGroup: "41-45", index: 6, count: 0 },
  { ageGroup: "46-50", index: 7, count: 0 },
  { ageGroup: "51-55", index: 8, count: 0 },
  { ageGroup: "56-60", index: 9, count: 0 },
  { ageGroup: "> 61", index: 10, count: 0 },
];

function processSurveyData(data: GetSurveyResponse[]): Record<string, AgeGroup[]> {
  const ageGroupsTemplate: AgeGroup[] = [
    { ageGroup: "<= 20", index: 1, count: 0 },
    { ageGroup: "21-25", index: 2, count: 0 },
    { ageGroup: "26-30", index: 3, count: 0 },
    { ageGroup: "31-35", index: 4, count: 0 },
    { ageGroup: "36-40", index: 5, count: 0 },
    { ageGroup: "41-45", index: 6, count: 0 },
    { ageGroup: "46-50", index: 7, count: 0 },
    { ageGroup: "51-55", index: 8, count: 0 },
    { ageGroup: "56-60", index: 9, count: 0 },
    { ageGroup: "> 61", index: 10, count: 0 },
  ];

  const result: Record<string, AgeGroup[]> = {};

  data.forEach((survey) => {
    const { wave, rows } = survey;

    // Ensure there's an entry for the wave in the result object
    if (!result[wave]) {
      result[wave] = JSON.parse(JSON.stringify(ageGroupsTemplate)) as AgeGroup[];
    }

    rows.forEach((rowArray) => {
      //@ts-ignore
      rowArray.forEach((row) => {
        const age = row.age;

        // Group ages
        if (age <= 20) {
          result[wave][0].count++;
        } else if (age <= 25) {
          result[wave][1].count++;
        } else if (age <= 30) {
          result[wave][2].count++;
        } else if (age <= 35) {
          result[wave][3].count++;
        } else if (age <= 40) {
          result[wave][4].count++;
        } else if (age <= 45) {
          result[wave][5].count++;
        } else if (age <= 50) {
          result[wave][6].count++;
        } else if (age <= 55) {
          result[wave][7].count++;
        } else if (age <= 60) {
          result[wave][8].count++;
        } else {
          result[wave][9].count++;
        }
      });
    });
  });

  return result;
}


const Row1 = () => {
  const { data: ranking } = useGetRankingsQuery();
  const { data: survey } = useGetSurveysQuery();
  const { palette } = useTheme();
  const [waves, setWaves] = useState<string[]>([]);
  const [selectedWave, setSelectedWave] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState(0);

  const ageGroupsByWave = processSurveyData(survey!);

  const renderTooltip = (props: { active: any; payload: any; }) => {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      const data = payload[0] && payload[0].payload;

      return (
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #999',
            margin: 0,
            padding: 10,
          }}
        >
          <p>{data.ageGroup}</p>
          <p>
            <span>Qtde: </span>
            {data.count}
          </p>
        </div>
      );
    }

    return null;
  };
  
  const wave202301 = [
    {ageGroup: 'até 20', index: 1, count: 157}, 
    {ageGroup: '21-25', index: 1, count: 73},
    {ageGroup: '26-30', index: 1, count: 15},
    {ageGroup: '31-35', index: 1, count: 8},
    {ageGroup: '36-40', index: 1, count: 3},
    {ageGroup: '41-45', index: 1, count: 2},
    {ageGroup: '46-50', index: 1, count: 2},
    {ageGroup: '51-55', index: 1, count: 1},
    {ageGroup: '56-60', index: 1, count: 0},
    {ageGroup: 'mais de 61', index: 1, count: 3}
]

 const wave202302 = [
    {ageGroup: 'até 20', index: 1, count: 75},
    {ageGroup: '21-25', index: 1, count: 24},
    {ageGroup: '26-30', index: 1, count: 11},
    {ageGroup: '31-35', index: 1, count: 0},
    {ageGroup: '36-40', index: 1, count: 3},
    {ageGroup: '41-45', index: 1, count: 1},
    {ageGroup: '46-50', index: 1, count: 1},
    {ageGroup: '51-55', index: 1, count: 2},
    {ageGroup: '56-60', index: 1, count: 0},
    {ageGroup: 'mais de 61', index: 1, count: 12}
 ]

 const parseDomain = () => [
  0,
  Math.max(
    Math.max.apply(
      null,
      wave202301.map((entry) => entry.count),
    ),
    Math.max.apply(
      null,
      wave202302.map((entry) => entry.count),
    ),
  ),
];

const domain = parseDomain();
const range = [16, 160];

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
          fill={"#17a2b8"}
          stroke={"#17a2b8"}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          
          fill={"#17a2b8"}
          stroke={"#17a2b8"}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={"#17a2b8"} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={"#17a2b8"} stroke={"#17a2b8"} />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={palette.primary[500]}>{`${payload.numberOfAnswers}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill={palette.primary[500]}>
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
            if (person.gender === 'Masculino'|| person.gender === 'masculino') {
              counts.masculino++;
            } else if (person.gender === 'Feminino'|| person.gender === 'feminino') {
              counts.feminino--;
            }
          });
        });
  
        genderWaveCounts.push(counts);
      } else {
        item.rows.forEach(row => {
          //@ts-ignore
          row.forEach(person => {
            if (person.gender === 'Masculino' || person.gender === 'masculino') {
              existingWave.masculino++;
            } else if (person.gender === 'Feminino'|| person.gender === 'feminino') {
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
      const countFemaleRows = countRowsByGender(survey, 'Feminino');
      
      const countsByGenderAndWave = countRowsByGenderAndWave(survey);
      
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
      <>
      <DashboardBox className="numberOfAnswersAllWaves" gridArea="a">
        <Box ml="1.5rem" mt="1rem" flexBasis="40%" textAlign="center">
          <Typography sx={{
            fontSize: 54,
            color: palette.primary[300]
          }}>
            {!ranking ? "Carregando" :
              `${ranking.length}`}
          </Typography>
          <Typography m="0.3rem 0" sx={{
            fontSize: 20,
            color: palette.primary[300]
          }}>
            {!wavesData ? "Carregando" :
              `respondentes em ${wavesData.numberOfWaves} ondas`}
          </Typography>
        </Box>
      </DashboardBox>
      
      <DashboardBox className="numberOfAnswersLastWave" gridArea="b">
        <Box ml="1.5rem" mt="1rem"  textAlign="center">
          <Typography sx={{
            fontSize: 54,
            color: palette.primary[300]
          }}>
            {!wavesData ? "Carregando" :
              `${wavesData.answersLastWave}`}
          </Typography>
          <Typography m="0.3rem 0" sx={{
            fontSize: 20,
            color: palette.primary[300]
          }}>
            {!wavesData ? "Carregando" :
              `respondentes na última onda (${wavesData.lastWave})`}
          </Typography>
        </Box>
      </DashboardBox>
      
      <DashboardBox  className="waveEvolution" gridArea="c">
        <BoxHeader
          title="Evolução de repondentes por onda"
          subtitle="considerando todas as instituições"
          sideText="" />
        <ResponsiveContainer  height="99%" width="99%">
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
              stroke={"#17a2b8"} />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      
      <Box className="page-break" gridArea="z">
        
      </Box>
      <DashboardBox className="answersByUniversityByWave" gridArea="d">
        <FlexBetween>
          <Box ml="1.5rem" mt="1rem" flexBasis="40%" textAlign="left">
            <BoxHeader title="Repondentes por Instituição por Onda" />
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
              background: palette.primary.light
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
              fill="#6c757d"
              stroke="#F0F0F0"
              dataKey="numberOfAnswers"
              onMouseEnter={onPieEnter} />
          </PieChart>
        </ResponsiveContainer>
      </DashboardBox>
      
      <DashboardBox className="sex" gridArea="e">
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
            <Bar dataKey="masculino" fill="#28a745" stackId="stack" />
            <Bar dataKey="feminino" fill="#17a2b8" stackId="stack" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="f">
        <Box ml="1.5rem" mt="1rem" mb="1rem" flexBasis="40%" textAlign="center">
          <BoxHeader title="Distribuição por idade" sideText="" />
        </Box>
      <ResponsiveContainer width="100%" height={60}>
          <ScatterChart
            margin={{
              top: 10,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          >
            <XAxis
              type="category"
              dataKey="ageGroup"
              interval={0}
              tick={{ fontSize: 0 }}
              tickLine={{ transform: 'translate(0, -6)' }}
            />
            <YAxis
              type="number"
              dataKey="index"
              name="202301"
              height={10}
              width={80}
              tick={false}
              tickLine={false}
              axisLine={false}
              label={{ value: '202301', position: 'insideRight' }}
            />
            <ZAxis type="number" dataKey="count" domain={domain} range={range} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={({ active, payload }) => {
              if (active && payload) {
                return renderTooltip({ active, payload });
              }
              return null;
            }}/>
            <Scatter data={wave202301} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={60}>
          <ScatterChart
            width={800}
            height={60}
            margin={{
              top: 10,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          >
            <XAxis
              type="category"
              dataKey="ageGroup"
              name="Faixa de idade"
              interval={0}
              tick={{ fontSize: 16 }}
              tickLine={{ transform: 'translate(0, -6)' }}
            />
            <YAxis
              type="number"
              dataKey="index"
              height={10}
              width={80}
              tick={false}
              tickLine={false}
              axisLine={false}
              label={{ value: '202302', position: 'insideRight' }}
            />
            <ZAxis type="number" dataKey="count" domain={domain} range={range} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={({ active, payload }) => {
              if (active && payload) {
                return renderTooltip({ active, payload });
              }
              return null;
            }}/>
            <Scatter data={wave202302} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
      </>
  }
  </>
  )
}

export default Row1