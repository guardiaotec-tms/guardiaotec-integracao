import React, { FunctionComponent } from 'react';
import { Box, Button } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';
import { Link } from 'react-router-dom';
import { CustomTable } from '../../components/Table/CustomTable';
import { FT } from '../../../domain/entities/FT';
import { useEffect } from 'react';
import { useState } from 'react';
import { FTRepositoryDatabase } from '../../../infra/repository/FTRepositoryDatabase';
import moment from 'moment';
import { fetchFTs } from '../../../infra/services/fetchFTs';
import { CompanyFilter } from '../../components/Filter/CompanyFilter';
import { useSelector } from 'react-redux';
import { RootState } from '../../../application/store/configureStore';
import { canRegister } from '../../../application/service/canRegister';

type Props = {};

export const FTPage: FunctionComponent<Props> = ({}) => {
  const [fts, setFTs] = useState<FT[]>([]);
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  useEffect(() => {
    if (adminSelectedCompanyId || userCompanyId) {
      fetchFTs(setFTs);
    }
  }, [adminSelectedCompanyId, userCompanyId]);

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const ft of fts) {
      rows.push([
        ft.values['Origem/Destino'],
        ft.values['Nº da FT'],
        ft.values['Nº da Linha'],
        moment(ft.values['Data de Vigencia Inicial']).format('DD/MM/YY'),
        ft.values['Frequência'].join(','),
        ft.values.Sentido,
      ]);
    }
    return rows;
  };

  const ftsTableHead = [
    'Origem/Destino',
    'Nº da FT',
    'Nº da Linha',
    'Data de Vigencia Inicial',
    'Frequência',
    'Sentido',
  ];
  const ftsTableRows = makeTableRows();

  const onRowUpdate = () => {
    console.log('onRowUpdate FTPage');
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
          to={`/workscale/register`}
          variant='contained'
          color='primary'
          disabled={!canRegister()}
        >
          Cadastrar
        </Button>
      </Box>
      <CustomTable
        tableHead={ftsTableHead}
        tableRows={ftsTableRows}
        onRowUpdate={onRowUpdate}
      />
    </div>
  );
};
