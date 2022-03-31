import React, { FunctionComponent } from 'react';
import { Box, Button } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';
import { Link } from 'react-router-dom';
import { CustomTable } from '../../components/Table/CustomTable';
import { Vehicle } from '../../../domain/entities/Vehicle';
import { useEffect } from 'react';
import { useState } from 'react';
import { VehicleRepositoryDatabase } from '../../../infra/repository/VehicleRepositoryDatabase';
import { RootState } from '../../../application/store/configureStore';
import { useSelector } from 'react-redux';
import { CompanyFilter } from '../../components/Filter/CompanyFilter';

type Props = {};

export const VehiclePage: FunctionComponent<Props> = ({}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  // useEffect(() => {
  //   const fetchVehicles = async () => {
  //     const repo = new VehicleRepositoryDatabase();
  //     const vehicles = await repo.getVehicles();
  //     setVehicles(vehicles);
  //   };
  //   fetchVehicles();
  // }, []);

  const fetchVehicles = async (shouldGetAll: boolean, companyId?: string) => {
    const repo = new VehicleRepositoryDatabase();
    if (shouldGetAll) {
      console.log('here');
      const vehicles = await repo.adminGetAllVehicles();
      setVehicles(vehicles);
    } else {
      const vehicles = await repo.getVehicles();
      setVehicles(vehicles);
    }
  };

  useEffect(() => {
    if (!isAdmin && userCompanyId) {
      fetchVehicles(false, userCompanyId);
    }
  }, [userCompanyId, userId]);

  useEffect(() => {
    if (isAdmin && adminSelectedCompanyId) {
      const shouldGetAll = adminSelectedCompanyId === 'Todas';
      fetchVehicles(shouldGetAll, adminSelectedCompanyId);
    }
  }, [isAdmin, adminSelectedCompanyId]);

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
      {isAdmin && <CompanyFilter />}
      <Box
        sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mb: 2 }}
      >
        <Button
          component={Link}
          to={`/vehicle/register`}
          variant='contained'
          color='primary'
          disabled={
            adminSelectedCompanyId === 'Todas' || adminSelectedCompanyId === ''
          }
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
