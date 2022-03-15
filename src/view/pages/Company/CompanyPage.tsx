import React, { FunctionComponent } from 'react';
import { Paper, TextField } from '@mui/material';
import { RegisterDriverForm } from '../../components/Forms/RegisterDriverForm';
import { Box, Button } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';
import { Link } from 'react-router-dom';
import { CustomTable } from '../../components/Common/CustomTable';
import { useState } from 'react';
import { Company } from '../../../domain/entities/Company';

type Props = {};

export const CompanyPage: FunctionComponent<Props> = ({}) => {
  const [companies, setCompanies] = useState<Company[]>([]);

  //   useEffect(() => {
  //     const fetchVehicles = async () => {
  //       const repo = new VehicleRepositoryDatabase();
  //       const vehicles = await repo.getVehicles();
  //       setVehicles(vehicles);
  //     };
  //     fetchVehicles();
  //   }, []);

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const company of companies) {
      rows.push([]);
    }
    return rows;
  };

  const vehiclesTableHead = [
    'Marca',
    'Modelo',
    'Cor',
    'Ano Fabricação',
    'Ano Modelo',
    'Placa',
    'Capacidade(m3)',
  ];
  const vehiclesTableRows = makeTableRows();

  return (
    <div>
      <ResponsiveAppBar />
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <Button
          component={Link}
          to={`/company/register`}
          variant='contained'
          color='primary'
        >
          Cadastrar
        </Button>
      </Box>
      <CustomTable
        tableHead={vehiclesTableHead}
        tableRows={vehiclesTableRows}
      />
    </div>
  );
};
