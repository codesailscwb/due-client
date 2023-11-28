import { FormControl, FormLabel, Table, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useAddXLSMutation, useGetXLSlinesQuery, useAddSurveyMutation } from '@/state/api';
import { XLS } from "@/state/types";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import DashboardBox from "@/components/DashboardBox";
import UploadBox from "@/components/UploadBox";
import { useTheme } from "@mui/material";
import BoxHeader from "@/components/BoxHeader";

import FlexBetween from "@/components/FlexBetween";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';


const Upload = () => {
  const { palette } = useTheme();
  const { data } = useGetXLSlinesQuery();
  const [items, setItems] = useState<Array<XLS>>([]);
  const [addRow] = useAddXLSMutation();
  const [addSurvey] = useAddSurveyMutation();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedName, setSelectedName] = useState("");

  const [rowsFromFile, setRowsFromFile] = useState<any>([])

  
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const readExcel = (event: any) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      e.preventDefault();
      if(!e.target) return;
      const bufferArray = e.target.result;
      const workbook = XLSX.read(bufferArray, {
        type: "buffer"
      });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      //@ts-ignore-next-line
      setItems(data);
    };
    };
  
  console.log('items', items);
  console.log('rowsFromFile', rowsFromFile);

  const [form, setForm] = useState({
    university: "",
    wave: "",
    rows: [{}],
  });

  const handleFormInputs = (e: { target: { name: any; value: any; }; }) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    const rowsWithId = items.map((item, index) => ({
      //@ts-ignore
      id: index, // You can use a better unique identifier if available
      ...item,
    }));
    setRowsFromFile(rowsWithId);
    setForm({
      ...form,
      rows: items,
    })
  }, [items]);
  
  const saveIntoDatabase = () => {  
    const entries = items.map((obj) => ({
      university: obj["university"] || "",
      wave: obj["wave"] || "",
      fullName: obj["fullName"] || "",
      birthdate: obj["birthdate"] || "",
      gender: obj["gender"] || "",
      question01: obj["question01"] || "",
      question02: obj["question02"] || "",
      question03: obj["question03"] || "",
      question04: obj["question04"] || "",
      question05: obj["question05"] || "",
      question06: obj["question06"] || "",
      question07: obj["question07"] || "",
      question08: obj["question08"] || "",
      question09: obj["question09"] || "",
      question10: obj["question10"] || "",
      question11: obj["question11"] || "",
      question12: obj["question12"] || "",
      question13: obj["question13"] || "",
      question14: obj["question14"] || "",
      question15: obj["question15"] || "",
      question16: obj["question16"] || "",
      question17: obj["question17"] || "",
      question18: obj["question18"] || "",
      question19: obj["question19"] || "",
      question20: obj["question20"] || "",
      question21: obj["question21"] || "",
      question22: obj["question22"] || "",
      question23: obj["question23"] || "",
      question24: obj["question24"] || "",
      question25: obj["question25"] || "",
      question26: obj["question26"] || "",
      question27: obj["question27"] || "",
      question28: obj["question28"] || "",
    }))
    if(entries.length) {
      for (let i = 0; i <= entries.length; i++ ) {
        //@ts-ignore-next-line
        addRow(entries[i])
      }
    }
    addSurvey(form);
  }

  console.log('form', form)
  const columns: GridColDef[] = [
    {
      field: 'fullName',
      headerName: 'Nome',
      width:180,
    },
    {
      field: 'birthdate',
      headerName: 'Nascimento',
      width:90,
    },
    {
      field: 'gender',
      headerName: 'Sexo',
      width:70,
    },
    {
      field: 'question01',
      headerName: '01',
      width:50,
    },
    {
      field: 'question02',
      headerName: '02',
      width:50,
    },
    {
      field: 'question03',
      headerName: '03',
      width:50,
    },
    {
      field: 'question04',
      headerName: '04',
      width:50,
    },
    {
      field: 'question05',
      headerName: '05',
      width:50,
    },
    {
      field: 'question06',
      headerName: '06',
      width:50,
    },
    {
      field: 'question07',
      headerName: '07',
      width:50,
    },
    {
      field: 'question08',
      headerName: '08',
      width:50,
    },
    {
      field: 'question09',
      headerName: '09',
      width:50,
    },
    {
      field: 'question10',
      headerName: '10',
      width:50,
    },
    {
      field: 'question11',
      headerName: '11',
      width:50,
    },
    {
      field: 'question12',
      headerName: '12',
      width:50,
    },
    {
      field: 'question13',
      headerName: '13',
      width:50,
    },
    {
      field: 'question14',
      headerName: '14',
      width:50,
    },
    {
      field: 'question15',
      headerName: '15',
      width:50,
    },
    {
      field: 'question16',
      headerName: '16',
      width:50,
    },
    {
      field: 'question17',
      headerName: '17',
      width:50,
    },
    {
      field: 'question18',
      headerName: '18',
      width:50,
    },
    {
      field: 'question19',
      headerName: '19',
      width:50,
    },
    {
      field: 'question20',
      headerName: '20',
      width:50,
    },
    {
      field: 'question21',
      headerName: '21',
      width:50,
    },
    {
      field: 'question22',
      headerName: '22',
      width:50,
    },
    {
      field: 'question23',
      headerName: '23',
      width:50,
    },
    {
      field: 'question24',
      headerName: '24',
      width:50,
    },
    {
      field: 'question25',
      headerName: '25',
      width:50,
    },
    {
      field: 'question26',
      headerName: '26',
      width:50,
    },
    {
      field: 'question27',
      headerName: '27',
      width:50,
    },
    {
      field: 'question28',
      headerName: '28',
      width:50,
    },
  ];

  return (
    <div>
      <BoxHeader
          title="Carregue a planilha padrão para salvar os dados da pesquisa"
          subtitle=""
          sideText=""
        />
      <Box maxWidth="80%" mt="16px" p="1rem">
      {/* <FlexBetween> */}
        <FormControl>
        <FormLabel sx={{
                color: palette.grey[100],
                mt: "1rem"
              }}>
                Intituição
          </FormLabel>
          <TextField type="text" name="university" sx={{
                color: palette.grey[900],
                backgroundColor: palette.grey[100],
                mt: "0.25rem",
                borderRadius: "5px",
                borderColor: palette.grey[500],
              }}
              onChange={handleFormInputs}
              >
          </TextField>
          <FormLabel sx={{
                color: palette.grey[100],
                mt: "1rem"
              }}>
                Onda (Ano + Semestre. Ex.: 202302)
          </FormLabel>
          <TextField type="text" name="wave" variant='outlined' sx={{
                color: palette.grey[900],
                backgroundColor: palette.grey[100],
                borderRadius: "5px",
                mt: "0.25rem"
              }}
              onChange={handleFormInputs}
              >
          </TextField>
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{
                mt: "1rem",
                height: "50px"
              }}>
            Carregar planilha
            <VisuallyHiddenInput type="file" onChange={readExcel} />
          </Button>
          <Button component="label" variant="contained" startIcon={<SaveIcon />} sx={{
                mt: "1rem",
                color: palette.primary[500],
                backgroundColor: palette.grey[900],
                height: "50px"
              }} onClick={saveIntoDatabase}>
            Salvar no banco de dados
          </Button>
        </FormControl>
        
        {/* </FlexBetween> */}
      </Box>
      <br></br>

      <BoxHeader
          title="Dados carregados:"
          subtitle=""
          sideText=""
        />
        
          <Box sx={{ maxWidth: '25%', ml: '16px'}}>
          <FlexBetween>
            <Typography sx={{
              mt: "1rem",
              color: palette.primary[500],
              backgroundColor: palette.grey[900],
            }}>
              Instituição: {form.university}
            </Typography>
            <Typography sx={{
              mt: "1rem",
              color: palette.primary[500],
              backgroundColor: palette.grey[900],
            }}>
              Onda: {form.wave}
            </Typography>
          </FlexBetween>
        </Box>
     
      
          <DashboardBox sx={{ height: 750, width: '100%', mt:'16px' }}>
            <DataGrid
              rows={rowsFromFile}
              columns={columns}
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
              sx={{
                color: palette.grey[900],
                backgroundColor: palette.grey[100],
              }}
            />
          </DashboardBox>
      
    </div>
  )
}

export default Upload