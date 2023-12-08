import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useGetRankingsQuery } from '@/state/api';
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from "react";

const Ranking = () => {
  const { data: ranking } = useGetRankingsQuery(); 
  const { palette } = useTheme();
      
  const columns: GridColDef[] = [
    {
      field: 'wave',
      headerName: 'Onda',
      width:100,
    },
    {
      field: 'university',
      headerName: 'Instituição',
      width:100,
    },
    {
      field: 'fullName',
      headerName: 'Nome',
      width:210,
    },
    {
      field: 'total',
      headerName: 'Total',
      width:100,
    },
    {
      field: 'behavior',
      headerName: 'Comportamento',
      width:110,
    },
    {
      field: 'personality',
      headerName: 'Personalidade',
      width:110,
    },
    {
      field: 'hability',
      headerName: 'Habilidade Natural',
      width:110,
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
        <DashboardBox className="ranking" >
             <div style={{ height: "90vh", width: "100%" }}>
              <Box
                mt="0.5rem"
                p="0 0.5rem"
                height="100%"
                sx={{
                  "& .MuiDataGrid-root": {
                    color: palette.grey[900],
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
                    color: palette.grey[900],
                  },
                  "& .MuiButtonBase-root":{
                    color: palette.grey[900],
                  }
                }}
              >
                  <DataGrid 
                    slots={{ toolbar: GridToolbar }}
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
                    columns={columns}
                    pageSizeOptions={[5]}
                  />
                </Box>
              </div>  
        </DashboardBox>
      </>
      }
    </>
  )
}

export default Ranking