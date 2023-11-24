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



const Ranking = () => {
  const { data: ranking } = useGetRankingsQuery(); 
  const { palette } = useTheme();
  const [rowsDataGrid, setRowsDataGrid] = useState<any>([]);
  
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
    {
      field: 'behavior',
      headerName: 'Comportamento',
      width:180,
    },
    {
      field: 'personality',
      headerName: 'Personalidade',
      width:180,
    },
    {
      field: 'hability',
      headerName: 'Habilidade Natural',
      width:180,
    },
  ];

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
          behavior: categoryRanking.totalC1,
          personality: categoryRanking.totalC2,
          hability: categoryRanking.totalC3,
          total: total,
          university: university
        };
      })
    );
  }, [ranking]);   

  return (
    <>
      {!rankingList ? "Carregando dados" : 
      <>
        <DashboardBox >
             <div style={{ height: 850, width: "100%" }}>
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
                    sorting: {
                      sortModel: [{ field: 'total', sort: 'desc' }],
                    },
                  }}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  columns={columns} />
                </Box>
              </div>  
        </DashboardBox>
      </>
      }
    </>
  )
}

export default Ranking