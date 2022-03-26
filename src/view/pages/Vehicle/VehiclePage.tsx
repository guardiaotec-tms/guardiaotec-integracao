import React, { FunctionComponent } from 'react';
import { Box, Button } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';
import { Link } from 'react-router-dom';
import { CustomTable } from '../../components/Table/CustomTable';
import { Vehicle } from '../../../domain/entities/Vehicle';
import { useEffect } from 'react';
import { useState } from 'react';
import { VehicleRepositoryDatabase } from '../../../infra/repository/VehicleRepositoryDatabase';

type Props = {};

export const VehiclePage: FunctionComponent<Props> = ({}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const repo = new VehicleRepositoryDatabase();
      const vehicles = await repo.getVehicles();
      setVehicles(vehicles);
    };
    fetchVehicles();
  }, []);

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const vehicle of vehicles) {
      rows.push([
        vehicle.values.Marca,
        vehicle.values.Modelo,
        vehicle.values.Cor,
        vehicle.values['Ano Fabricação'].getFullYear().toString(),
        vehicle.values['Ano Modelo'].getFullYear().toString(),
        vehicle.values.Placa,
        vehicle.values.Chassi,
        vehicle.values.Renavam,
        vehicle.values['Capacidade(m3)'].toString(),
        vehicle.values.Categoria,
      ]);
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
    'Chassi',
    'Renavam',
    'Capacidade(m3)',
    'Categoria',
  ];
  const vehiclesTableRows = makeTableRows();

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
          to={`/vehicle/register`}
          variant='contained'
          color='primary'
        >
          Cadastrar
        </Button>
      </Box>
      <CustomTable
        tableHead={vehiclesTableHead}
        tableRows={vehiclesTableRows}
        onRowUpdate={onRowUpdate}
      />
    </div>
  );
};
