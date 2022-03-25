import React, { FunctionComponent } from 'react';
import { Box, Button } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';
import { Link } from 'react-router-dom';
import { CustomTable } from '../../components/Table/CustomTable';
import { useState } from 'react';
import { Company } from '../../../domain/entities/Company';
import { useEffect } from 'react';
import { CompanyRepositoryDatabase } from '../../../infra/repository/CompanyRepositoryDatabase';

type Props = {};

export const CompanyPage: FunctionComponent<Props> = ({}) => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const repo = new CompanyRepositoryDatabase();
      const companies = await repo.getCompanies();
      setCompanies(companies);
    };
    fetchCompanies();
  }, []);

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const company of companies) {
      rows.push([
        company.values['Numero de Contrato'],
        company.values['Código'],
        company.values['Transportadora'],
        company.values['CNPJ'],
        company.values['Contato'],
        company.values['Email'],
        company.values['Responsável'],
      ]);
    }
    return rows;
  };

  const companiesTableHead = [
    'Numero de Contrato',
    'Código',
    // 'Razão Social',
    'CNPJ',
    'Contato',
    'Email',
    'Responsável',
  ];
  const companiesTableRows = makeTableRows();

  const onRowUpdate = (row: string[]) => {
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
          to={`/company/register`}
          variant='contained'
          color='primary'
        >
          Cadastrar
        </Button>
      </Box>
      <CustomTable
        tableHead={companiesTableHead}
        tableRows={companiesTableRows}
        onRowUpdate={onRowUpdate}
      />
    </div>
  );
};
