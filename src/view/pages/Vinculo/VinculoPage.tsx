import React, { FunctionComponent } from 'react';
import { Box, Button } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';
import { Link } from 'react-router-dom';
import { CustomTable } from '../../components/Table/CustomTable';
import { Vinculo } from '../../../domain/entities/Vinculo';
import { useEffect } from 'react';
import { useState } from 'react';
import { VinculoRepositoryDatabase } from '../../../infra/repository/VinculoRepositoryDatabase';

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
      rows.push([
        vinculo.values['Transportadora (CNPJ)'],
        vinculo.values['Motorista (CNH)'],
        vinculo.values['Veículo (Placa)'],
        vinculo.values.LTU,
        vinculo.values['Nº da FT'],
      ]);
    }
    return rows;
  };

  const vinculosTableHead = [
    'Transportadora (CNPJ)',
    'Motorista (CNH)',
    'Veículo (Placa)',
    'LTU',
    'Nº da FT',
  ];

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
