import React, { FunctionComponent } from 'react';
import { Box, Button } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';
import { Link } from 'react-router-dom';
import { CustomTable } from '../../components/Table/CustomTable';
import { useState } from 'react';
import { Company } from '../../../domain/entities/Company';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CompanyRepositoryDatabase } from '../../../infra/repository/CompanyRepositoryDatabase';
import { RootState } from '../../../application/store/configureStore';
import { TargetFilter } from '../Common/TargetFilter';
import { RowCommand } from '../../components/Table/TableRowOptions';
import { EditCompanyForm } from '../../components/Forms/Company/EditCompanyForm';

type Props = {};

export const CompanyPage: FunctionComponent<Props> = ({}) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const [inEdit, setInEdit] = useState(false);
  const [inDelete, setInDelete] = useState(false);
  const [targetCommandCompany, setTargetCommandCompany] = useState<Company>();

  const fetchCompanies = async () => {
    const repo = new CompanyRepositoryDatabase();
    const companies = await repo.getCompanies();
    setCompanies(companies);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const company of filteredCompanies) {
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
    'Transportadora',
    'CNPJ',
    'Contato',
    'Email',
    'Responsável',
    '',
  ];
  const companiesTableRows = makeTableRows();

  const onRowCommand = (command: RowCommand, row: string[]) => {
    console.log(command, row);
    const company = companies.find((c) => c.values.CNPJ === row[3]);
    if (!company) return;
    setTargetCommandCompany(company);
    if (command === 'edit') setInEdit(true);
    if (command === 'delete') setInDelete(true);
  };

  const onEditClose = () => {
    setInEdit(false);
    fetchCompanies();
  };

  const onDeleteClose = () => {
    setInDelete(false);
    fetchCompanies();
  };

  return (
    <div>
      <ResponsiveAppBar />
      <TargetFilter
        targets={companies}
        setFilteredTargets={setFilteredCompanies}
        filterField='Transportadora'
        filterName='Filtrar por nome'
      />
      <Box
        sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mb: 2 }}
      >
        {isAdmin && (
          <Button
            component={Link}
            to={`/company/register`}
            variant='contained'
            color='primary'
          >
            Cadastrar
          </Button>
        )}
      </Box>
      <CustomTable
        tableHead={companiesTableHead}
        tableRows={companiesTableRows}
        onRowCommand={onRowCommand}
      />
      {inEdit && (
        <EditCompanyForm
          open={inEdit}
          onClose={onEditClose}
          company={targetCommandCompany!}
          companyId={targetCommandCompany!.values.Id!}
        />
      )}
      {inDelete && (
        <DeleteCompanyConfirm
          open={inDelete}
          onClose={onDeleteClose}
          company={targetCommandCompany!}
          companyId={targetCommandCompany!.values.Id!}
        />
      )}
      {/*// é uma dialog}*/}
    </div>
  );
};
