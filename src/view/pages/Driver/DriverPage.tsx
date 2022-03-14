import React, { FunctionComponent } from 'react';
import { Paper, TextField } from '@mui/material';
import { RegisterDriverForm } from '../../components/Forms/RegisterDriverForm';
import { Box, Button } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';
import { Link } from 'react-router-dom';
import { CustomTable } from '../../components/Common/CustomTable';
import { useEffect } from 'react';
import { useState } from 'react';
import { Driver } from '../../../domain/entities/Driver';
import { DriverRepositoryDatabase } from '../../../infra/repository/DriverRepositoryDatabase';
import moment from 'moment';

type Props = {};

export const DriverPage: FunctionComponent<Props> = ({}) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      const repo = new DriverRepositoryDatabase();
      const drivers = await repo.getDrivers();
      setDrivers(drivers);
    };
    fetchDrivers();
  }, []);

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const driver of drivers) {
      rows.push([
        driver.nome,
        driver.cnh,
        driver.contato,
        moment(driver.vencimento).format('MM/YYYY'),
      ]);
    }
    return rows;
  };

  const driversTableHead = ['Nome', 'CNH', 'Contato', 'Vencimento CNH'];
  const driversTableRows = makeTableRows();

  return (
    <div>
      <ResponsiveAppBar />
      <Box
        sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mb: 2 }}
      >
        <Button
          component={Link}
          to={`/driver/register`}
          variant='contained'
          color='primary'
        >
          Cadastrar
        </Button>
      </Box>
      <CustomTable
        tableHead={driversTableHead}
        // tableRows={[['Dimitre', '2312asdasd', '12312asdasd', '123dasd']]}
        tableRows={driversTableRows}
      />
      {/* <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <RegisterDriverForm />
      </Box> */}
    </div>
  );
};
