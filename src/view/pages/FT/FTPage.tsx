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

type Props = {};

export const FTPage: FunctionComponent<Props> = ({}) => {
  const [fts, setFTs] = useState<FT[]>([]);

  useEffect(() => {
    const fetchFTs = async () => {
      const repo = new FTRepositoryDatabase();
      const fts = await repo.getFTs();
      setFTs(fts);
    };
    fetchFTs();
  }, []);

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const ft of fts) {
      rows.push([
        ft.values['Nº da FT'],
        ft.values['Nº da Linha'],
        ft.values['Frequência'].join(','),
        ft.values.Sequencia,
        ft.values['Ponto De Parada'],
        moment(ft.values.Chegada).format('DD/MM/YY hh:mm'),
        moment(ft.values.Partida).format('DD/MM/YY hh:mm'),
        ft.values.Serviço,
        ft.values.Espera,
        ft.values.Livre,
        ft.values.Horas,
        ft.values.Serviços,
        ft.values.Endereço,
        ft.values['LTU'],
      ]);
    }
    return rows;
  };

  const ftsTableHead = [
    'Nº da FT',
    'Nº da Linha',
    'Frequência',
    'Sequencia',
    'Ponto De Parada',
    'Chegada',
    'Partida',
    'Serviço',
    'Espera',
    'Livre',
    'Horas',
    'Serviços',
    'Endereço',
    'LTU',
  ];
  const ftsTableRows = makeTableRows();

  const onRowUpdate = () => {
    console.log('onRowUpdate FTPage');
  };

  return (
    <div>
      <ResponsiveAppBar />
      <Box
        sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mb: 2 }}
      >
        <Button
          component={Link}
          to={`/workscale/register`}
          variant='contained'
          color='primary'
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