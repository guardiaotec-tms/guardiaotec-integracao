import React, { FunctionComponent } from 'react';
import { Box, Button } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';
import { Link } from 'react-router-dom';
import { CustomTable } from '../../components/Table/CustomTable';
import { Vinculo } from '../../../domain/entities/Vinculo';
import { useEffect } from 'react';
import { useState } from 'react';
import { VinculoRepositoryDatabase } from '../../../infra/repository/VinculoRepositoryDatabase';
import { RootState } from '../../../application/store/configureStore';
import { useSelector } from 'react-redux';
import { fetchVinculos } from '../../../infra/services/fetchVinculos';
import { CompanyFilter } from '../../components/Filter/CompanyFilter';
import { canRegister } from '../../../application/service/canRegister';
import { TargetFilter } from '../Common/TargetFilter';
import { RowCommand } from '../../components/Table/TableRowOptions';

type Props = {};

export const VinculoPage: FunctionComponent<Props> = ({}) => {
  const [vinculos, setVinculos] = useState<Vinculo[]>([]);
  const [filteredVinculos, setFilteredVinculos] = useState<Vinculo[]>([]);
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );
  const { userId, isAdmin, user } = useSelector(
    (state: RootState) => state.auth
  );
  //   useEffect(() => {
  //     const fetchVinculos = async () => {
  //       const repo = new VinculoRepositoryDatabase();
  //       const Vinculos = await repo.getVinculos();
  //       setVinculos(Vinculos);
  //     };
  //     fetchVinculos();
  //   }, []);

  useEffect(() => {
    if (adminSelectedCompanyId || userCompanyId) {
      fetchVinculos(setVinculos);
    }
  }, [adminSelectedCompanyId, userCompanyId]);

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const vinculo of filteredVinculos) {
      rows.push([
        vinculo.values['Transportadora'],
        vinculo.values['Motorista (CNH)'],
        vinculo.values['Veículo (Placa)'],
        vinculo.values.LTU,
        vinculo.values['Nº da FT'],
      ]);
    }
    return rows;
  };

  const vinculosTableHead = [
    'Transportadora',
    'Motorista (CNH)',
    'Veículo (Placa)',
    'LTU',
    'Nº da FT',
    '',
  ];

  const vinculosTableRows = makeTableRows();

  const onRowCommand = (command: RowCommand, row: string[]) => {
    console.log(command, row);
    console.log('onRowUpdate driverPage');
  };

  return (
    <div>
      <ResponsiveAppBar />
      {isAdmin && <CompanyFilter />}
      <TargetFilter
        targets={vinculos}
        setFilteredTargets={setFilteredVinculos}
        filterField='LTU'
        filterName='LTU'
      />
      <Box
        sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mb: 2 }}
      >
        <Button
          component={Link}
          to={`/vinculo/register`}
          variant='contained'
          color='primary'
          disabled={!canRegister()}
        >
          Cadastrar
        </Button>
      </Box>
      <CustomTable
        tableHead={vinculosTableHead}
        tableRows={vinculosTableRows}
        onRowCommand={onRowCommand}
      />
    </div>
  );
};
