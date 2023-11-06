import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import { useGetRankingsQuery, useGetXLSlinesQuery, useGetSurveysQuery } from '@/state/api';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";


const Row1 = () => {
  const { data: ranking } = useGetRankingsQuery();
  const { data: xlsLines } = useGetXLSlinesQuery();
  const { data: survey } = useGetSurveysQuery();
   
  const { palette } = useTheme();
  const [rowsDataGrid, setRowsDataGrid] = useState<any>([])

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

  const totalSurveyAnswers = useMemo(() => {
    return (
      survey &&
      survey.map(({ wave }) => {
        return {
          name: wave,
          answers: survey.length,
        };
      })
    );
  }, [survey]);   

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

  
console.log(rankingList)
  return (
    <>
      {/* {!surveysData ? "Carregando" : 
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Número de respondentes por onda"
          subtitle="total de respondentes de todas as instituições"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={totalSurveyAnswers}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="answers" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
      } */}
      <DashboardBox gridArea="a">
        <Box ml="1.5rem" mt="1.5rem" flexBasis="40%" textAlign="left">
          <Typography variant="h5">
            {!survey ? "Carregando" :
              `Número de respondentes na onda ${survey[0].wave}:`
            }
          </Typography>
          <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
            {!survey ? "Carregando" :
              `${survey[0].rows.length}`
            }
          </Typography>
      </Box>
      {!rankingList ? "Carregando" : 
        <div style={{ height: 400, width: "100%" }}>
          <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="100%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
            "& .MuiTablePagination-displayedRows": {
              color: palette.grey[100],
            },
            "& .MuiButtonBase-root":{
              color: palette.grey[100],
            }
          }}
        >
          <DataGrid 
            rows={rankingList}
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 50,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            columns={columns} />
            
          </Box>
        </div>
      }
      </DashboardBox>
    </>
  )
}

export default Row1