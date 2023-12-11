import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useGetRankingsQuery } from '@/state/api';
import { Box, Button, useTheme } from "@mui/material";
import DataGrid from 'react-data-grid';
import { useEffect, useMemo, useState } from "react";
import 'react-data-grid/lib/styles.css';
import { Row, SortColumn } from '@/state/types';
import { exportToCsv, exportToPdf } from './exportUtils';

type Comparator = (a: Row, b: Row) => number;

function getComparator(sortColumn: string): Comparator {
  switch (sortColumn) {
    case 'fullName':
    case 'university':
    case 'wave':
      return (a, b) => {
        return a[sortColumn].localeCompare(b[sortColumn]);
      };
    
    case 'behavior':
    case 'personality':
    case 'hability':
    case 'total':
    return (a, b) => {
      return a[sortColumn] - b[sortColumn];
    };
    default:
      throw new Error(`unsupported sortColumn: "${sortColumn}"`);
  }
}

const Ranking = () => {
  const { data: ranking } = useGetRankingsQuery(); 
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const [rows, setRows] = useState(createRows);
      
  const columns = [
    {
      key: 'wave',
      name: 'Onda',
    },
    {
      key: 'university',
      name: 'Instituição',
    },
    {
      key: 'fullName',
      name: 'Nome',
    },
    {
      key: 'total',
      name: 'Total',
    },
    {
      key: 'behavior',
      name: 'Comportamento',
    },
    {
      key: 'personality',
      name: 'Personalidade',
    },
    {
      key: 'hability',
      name: 'Habilidade Natural',
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

  function createRows(): readonly Row[] {
    const rows: Row[] = [];
    if(ranking === undefined) return [];
    for (let i = 0; i < ranking?.length; i++) {
      rows.push({
        id: i,
        fullName: ranking[i].fullName,
        university: ranking[i].university,
        wave: ranking[i].wave,
        behavior: ranking[i].categoryRanking.totalC1,
        personality: ranking[i].categoryRanking.totalC2,
        hability: ranking[i].categoryRanking.totalC1,
        total: ranking[i].total
      });
    }
    console.log('rows', rows)
    return rows;
  }

  const sortedRows = useMemo((): readonly Row[] => {
    if (sortColumns.length === 0) return rows;

    return [...rows].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === 'ASC' ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [rows, sortColumns]);

  function ExportButton({
    onExport,
    children
  }: {
    onExport: () => Promise<unknown>;
    children: React.ReactChild;
  }) {
    const [exporting, setExporting] = useState(false);
    return (
      <Button
        type="button"
        disabled={exporting}
        onClick={async () => {
          setExporting(true);
          await onExport();
          setExporting(false);
        }}
      >
        {exporting ? 'Exporting' : children}
      </Button>
    );
  }

  const gridElement = (
    <DataGrid 
      rows={sortedRows}
      columns={columns}
      defaultColumnOptions={{
        sortable: true,
        resizable: true
      }}
      sortColumns={sortColumns}
      onSortColumnsChange={setSortColumns}
      className="fill-grid"
    />
  )

  return (
    <>
      {!rankingList ? "Carregando dados" : 
      <>
        <DashboardBox>
          <div style={{ height: "90vh", width: "100%" }}>
          <Box
            mt="0.5rem"
            p="0 0.5rem"
            height="100%"
            width="100%"
          >   
            <div>
              <ExportButton onExport={() => exportToCsv(gridElement, 'DUE-Ranking.csv')}>
                Exportar para CSV
              </ExportButton>
              <ExportButton onExport={() => exportToPdf(gridElement, 'DUE-Ranking.pdf')}>
                Exportar para PDF
              </ExportButton>
            </div>
              {gridElement}
            </Box>
          </div>  
        </DashboardBox>
      </>
      }
    </>
  )
}

export default Ranking