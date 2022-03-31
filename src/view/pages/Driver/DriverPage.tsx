import React, { FunctionComponent } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
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
import { fetchCompanies } from '../../../infra/services/fetchCompanies';
import { Company } from '../../../domain/entities/Company';

type Props = {};

export const DriverPage: FunctionComponent<Props> = ({}) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  // const drivers = useSelector((state: RootState) => state.drivers.drivers);
  // const drivers = useDrivers();
  const [selectedCompany, setSelectedCompany] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);

  const userId = useSelector((state: RootState) => state.auth.userId);
  const companyId = useSelector(
    (state: RootState) => state.companies.companyId
  );

  const fetchDrivers = async (shouldGetAll: boolean, companyId?: string) => {
    const repo = new DriverRepositoryDatabase();

    if (shouldGetAll) {
      const drivers = await repo.adminGetAllDrivers();
      setDrivers(drivers);
    } else {
      console.log('to aqui', companyId);
      const drivers = await repo.getDriversFromCompanyId(companyId!);
      setDrivers(drivers);
    }
  };

  useEffect(() => {
    const isAdmin = userId === '8apvlVyigrYY4cTJ9E2xl9LZvlS2';

    if (isAdmin) console.log('sou admin');
    if (!isAdmin) console.log('não sou admin');

    if (isAdmin) {
      // fetchDrivers();
    } else if (companyId) {
      fetchDrivers(isAdmin);
    }
  }, [companyId, userId]);

  useEffect(() => {}, []);

  useEffect(() => {
    fetchCompanies(setCompanies);
  }, []);

  const handleSelectCompany = (event: SelectChangeEvent) => {
    setSelectedCompany(event.target.value);
    console.log(event.target.value);
    const companyId = event.target.value;

    if (event.target.value === 'Todas') {
      fetchDrivers(true);
    } else {
      fetchDrivers(false, companyId);
    }
  };

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
        <Box sx={{ position: 'absolute', left: 10, top: 80 }}>
          <Box sx={{ mb: 1.3 }}>
            <FormControl sx={{ minWidth: 220 }} fullWidth>
              <InputLabel id='demo-simple-select-helper-label'>
                Transportadora
              </InputLabel>
              <Select
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={selectedCompany || ''}
                label={'Transportadora'}
                onChange={handleSelectCompany}
                fullWidth
              >
                {companies &&
                  companies
                    .map((company: Company) => {
                      return (
                        <MenuItem
                          key={company.values.CNPJ}
                          value={company.values.Id!}
                        >
                          {company.values.Transportadora}
                        </MenuItem>
                      );
                    })
                    .concat([
                      <MenuItem key={'unique'} value={'Todas'}>
                        Todas
                      </MenuItem>,
                    ])}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mb: 2 }}
        >
          <Button
            component={Link}
            to={`/driver/register`}
            variant='contained'
            color='primary'
            disabled={selectedCompany === 'Todas'}
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
