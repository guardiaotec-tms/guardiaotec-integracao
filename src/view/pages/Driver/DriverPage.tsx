import React, { FunctionComponent } from 'react';
import { Box, Button } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';
import { Link } from 'react-router-dom';
import { CustomTable } from '../../components/Table/CustomTable';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Driver } from '../../../domain/entities/Driver';
import { DriverRepositoryDatabase } from '../../../infra/repository/DriverRepositoryDatabase';
import moment from 'moment';
import { RootState } from '../../../application/store/configureStore';
import { CompanyFilter } from '../../components/Filter/CompanyFilter';

type Props = {};

export const DriverPage: FunctionComponent<Props> = ({}) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  const fetchDrivers = async (
    shouldGetAll: boolean,
    userCompanyId?: string
  ) => {
    const repo = new DriverRepositoryDatabase();

    if (shouldGetAll) {
      const drivers = await repo.adminGetAllDrivers();
      setDrivers(drivers);
    } else {
      const drivers = await repo.getDriversFromCompanyId(userCompanyId!);
      setDrivers(drivers);
    }
  };

  useEffect(() => {
    if (!isAdmin && userCompanyId) {
      fetchDrivers(false, userCompanyId);
    }
  }, [userCompanyId, userId]);

  useEffect(() => {
    if (isAdmin && adminSelectedCompanyId) {
      const shouldGetAll = adminSelectedCompanyId === 'Todas';
      fetchDrivers(shouldGetAll, adminSelectedCompanyId);
    }
  }, [isAdmin, adminSelectedCompanyId]);

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
      <div>
        {isAdmin && <CompanyFilter />}
        <Box
          sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mb: 2 }}
        >
          <Button
            component={Link}
            to={`/driver/register`}
            variant='contained'
            color='primary'
            disabled={
              adminSelectedCompanyId === 'Todas' ||
              adminSelectedCompanyId === ''
            }
          >
            Cadastrar
          </Button>
        </Box>
      </div>
      <CustomTable
        tableHead={driversTableHead}
        tableRows={driversTableRows}
        onRowUpdate={onRowUpdate}
      />
    </div>
  );
};
