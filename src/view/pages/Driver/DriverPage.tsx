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
import { useDrivers } from '../../../application/hooks/useDrivers';
import { db } from '../../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

type Props = {};

export const DriverPage: FunctionComponent<Props> = ({}) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  // const drivers = useSelector((state: RootState) => state.drivers.drivers);
  // const drivers = useDrivers();

  const userId = useSelector((state: RootState) => state.auth.userId);
  const companyId = useSelector(
    (state: RootState) => state.companies.companyId
  );

  useEffect(() => {
    const isAdmin = userId === '8apvlVyigrYY4cTJ9E2xl9LZvlS2';

    if (isAdmin) console.log('sou admin');
    if (!isAdmin) console.log('não sou admin');

    const fetchDrivers = async () => {
      const repo = new DriverRepositoryDatabase();

      if (isAdmin) {
        const drivers = await repo.adminGetAllDrivers();
        setDrivers(drivers);
      } else {
        const drivers = await repo.getDriversFromCompanyId(companyId);
        setDrivers(drivers);
      }
    };

    if (isAdmin) {
      fetchDrivers();
    } else if (companyId) {
      fetchDrivers();
    }

    // const fetchDrivers = async () => {
    //   const repo = new DriverRepositoryDatabase();
    //   const drivers = await repo.getDriversFromCompanyId(companyId);
    //   setDrivers(drivers);
    // };
    // fetchDrivers();
    // const fetchUserData = async () => {
    //   const docRef = doc(db, 'users', userId);
    //   const docSnap = await getDoc(docRef);

    //   if (!docSnap.exists()) throw new Error('Usuário não existe!');
    //   return docSnap.data();
    // };

    // const fetchOneCompany = async (companyId: string) => {
    //   const docRef = doc(db, 'companies', companyId);
    //   const docSnap = await getDoc(docRef);

    //   if (!docSnap.exists()) throw new Error('Transportadora não encontrada!');
    //   console.log(docSnap.data());
    //   return docSnap.data();
    // };

    // fetchUserData().then((userData: any) => {
    //   fetchOneCompany(userData.companyId);
    // });
  }, [companyId, userId]);

  useEffect(() => {
    // const fetchDrivers = async () => {
    //   const repo = new DriverRepositoryDatabase();
    //   const drivers = await repo.getDrivers();
    //   setDrivers(drivers);
    // };
    // fetchDrivers();
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
