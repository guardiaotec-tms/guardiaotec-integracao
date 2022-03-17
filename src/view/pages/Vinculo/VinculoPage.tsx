import React, { FunctionComponent } from 'react';
import { Box, Button } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';
import { Link } from 'react-router-dom';
import { CustomTable } from '../../components/Table/CustomTable';
import { Vinculo } from '../../../domain/entities/Vinculo';
import { useEffect } from 'react';
import { useState } from 'react';
import { VinculoRepositoryDatabase } from '../../../infra/repository/VinculoRepositoryDatabase';
import moment from 'moment';

type Props = {};

export const VinculoPage: FunctionComponent<Props> = ({}) => {
  const [vinculos, setVinculos] = useState<Vinculo[]>([]);

  useEffect(() => {
    const fetchVinculos = async () => {
      const repo = new VinculoRepositoryDatabase();
      const Vinculos = await repo.getVinculos();
      setVinculos(Vinculos);
    };
    fetchVinculos();
  }, []);

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const vinculo of vinculos) {
      rows.push(['v11']);
    }
    return rows;
  };

  const vinculosTableHead = ['v1'];
  const vinculosTableRows = makeTableRows();

  const onRowUpdate = () => {
    console.log('onRowUpdate VinculoPage');
  };

  return (
    <div>
      <ResponsiveAppBar />
      <Box
        sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mb: 2 }}
      >
        <Button
          component={Link}
          to={`/vinculo/register`}
          variant='contained'
          color='primary'
        >
          Cadastrar
        </Button>
      </Box>
      <CustomTable
        tableHead={vinculosTableHead}
        tableRows={vinculosTableRows}
        onRowUpdate={onRowUpdate}
      />
    </div>
  );
};
