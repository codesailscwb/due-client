import { FormControl, FormLabel, Table, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { styled } from '@mui/material/styles';
import { SetStateAction, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useAddXLSMutation, useGetXLSlinesQuery, useAddSurveyMutation } from '@/state/api';
import { XLS } from "@/state/types";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import DashboardBox from "@/components/DashboardBox";
import UploadBox from "@/components/UploadBox";
import { useTheme } from "@mui/material";
import BoxHeader from "@/components/BoxHeader";
import moment from 'moment';

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

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedName, setSelectedName] = useState("");

  const [rowsFromFile, setRowsFromFile] = useState<any>([])

  const openSuccessDialog = () => {
    setIsError(false);
    setDialogMessage('Pesquisa salva com sucesso.');
    setOpenDialog(true);
  };
  
  const openErrorDialog = (errorMessage: any) => {
    setIsError(true);
    setDialogMessage(errorMessage);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  
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
    const rowsWithId = items.map((item, index) => {
      const formattedBirthdate = item.birthdate
      ? moment(item.birthdate, ['MM/DD/YYYY', 'M/D/YYYY'], true).format('DD/MM/YYYY')
      : 'Não informado';

      return {
      //@ts-ignore
      id: index,
      birthdate: formattedBirthdate,
      gender: item.gender || "Não informado",
      fullName: item.fullName,
      question01: item.question01 || "0",
      question02: item.question02 || "0",
      question03: item.question03 || "0",
      question04: item.question04 || "0",
      question05: item.question05 || "0",
      question06: item.question06 || "0",
      question07: item.question07 || "0",
      question08: item.question08 || "0",
      question09: item.question09 || "0",
      question10: item.question10 || "0",
      question11: item.question11 || "0",
      question12: item.question12 || "0",
      question13: item.question13 || "0",
      question14: item.question14 || "0",
      question15: item.question15 || "0",
      question16: item.question16 || "0",
      question17: item.question17 || "0",
      question18: item.question18 || "0",
      question19: item.question19 || "0",
      question20: item.question20 || "0",
      question21: item.question21 || "0",
      question22: item.question22 || "0",
      question23: item.question23 || "0",
      question24: item.question24 || "0",
      question25: item.question25 || "0",
      question26: item.question26 || "0",
      question27: item.question27 || "0",
      question28: item.question28 || "0",
    };
    });
    setRowsFromFile(rowsWithId);
    setForm({
      ...form,
      rows: items,
    })
  }, [items]);
  
  const saveIntoDatabase = async () => {  
    try {
      setIsSaving(true);
      const entries = items.map((obj) => ({
        university: obj["university"] || "",
        wave: obj["wave"] || "",
        fullName: obj["fullName"] || "",
        birthdate: obj["birthdate"] || "Não informado",
        gender: obj["gender"] || "Não informado",
        question01: obj["question01"] || "0",
        question02: obj["question02"] || "0",
        question03: obj["question03"] || "0",
        question04: obj["question04"] || "0",
        question05: obj["question05"] || "0",
        question06: obj["question06"] || "0",
        question07: obj["question07"] || "0",
        question08: obj["question08"] || "0",
        question09: obj["question09"] || "0",
        question10: obj["question10"] || "0",
        question11: obj["question11"] || "0",
        question12: obj["question12"] || "0",
        question13: obj["question13"] || "0",
        question14: obj["question14"] || "0",
        question15: obj["question15"] || "0",
        question16: obj["question16"] || "0",
        question17: obj["question17"] || "0",
        question18: obj["question18"] || "0",
        question19: obj["question19"] || "0",
        question20: obj["question20"] || "0",
        question21: obj["question21"] || "0",
        question22: obj["question22"] || "0",
        question23: obj["question23"] || "0",
        question24: obj["question24"] || "0",
        question25: obj["question25"] || "0",
        question26: obj["question26"] || "0",
        question27: obj["question27"] || "0",
        question28: obj["question28"] || "0",
      }))
      if(entries.length) {
        for (let i = 0; i <= entries.length; i++ ) {
          //@ts-ignore-next-line
          await addRow(entries[i])
        }
      }
      await addSurvey(form);

      setIsSaving(false);
      openSuccessDialog();
    } catch (error) {
      setIsSaving(false);
      openErrorDialog("Houve um erro ao salvar pesquisa. Tente novamente.")
    }
  }

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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isError ? 'Erro' : 'Sucesso'}</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
      <BoxHeader
          title="Carregue a planilha padrão para salvar os dados da pesquisa"
          subtitle=""
          sideText=""
        />
      <Box maxWidth="80%" mt="8px" p="1rem">
      {/* <FlexBetween> */}
        <FormControl>
        <FormLabel sx={{
                color: palette.grey[900],
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
                color: palette.grey[900],
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
          {isSaving && <Typography>Salvando...</Typography>}
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
              backgroundColor: palette.grey[100],
            }}>
              Instituição: {form.university}
            </Typography>
            <Typography sx={{
              mt: "1rem",
              color: palette.primary[500],
              backgroundColor: palette.grey[100],
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