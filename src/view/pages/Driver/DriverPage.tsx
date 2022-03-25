import React, { FunctionComponent } from 'react';
import { Box, Button } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';
import { Link } from 'react-router-dom';
import { CustomTable } from '../../components/Table/CustomTable';
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
        driver.contato,
        driver.cnh,
        moment(driver.vencimento).format('MM/YYYY'),
      ]);
    }
    return rows;
  };

  const driversTableHead = ['Nome', 'Contato', 'CNH', 'Vencimento CNH'];
  const driversTableRows = makeTableRows();

  const onRowUpdate = () => {
    console.log('onRowUpdate driverPage');
  };

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
        tableRows={driversTableRows}
        onRowUpdate={onRowUpdate}
      />
    </div>
  );
};
