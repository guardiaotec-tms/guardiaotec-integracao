import React, { FunctionComponent } from 'react';
import { Box, Button } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';
import { Link } from 'react-router-dom';
import { CustomTable } from '../../components/Table/CustomTable';
import { Itinerary } from '../../../domain/entities/Itinerary';
import { useEffect } from 'react';
import { useState } from 'react';
import { ItineraryRepositoryDatabase } from '../../../infra/repository/ItineraryRepositoryDatabase';
import moment from 'moment';

type Props = {};

export const ItineraryPage: FunctionComponent<Props> = ({}) => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const repo = new ItineraryRepositoryDatabase();
      const itineraries = await repo.getItineraries();
      setItineraries(itineraries);
    };
    fetchVehicles();
  }, []);

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const itinerary of itineraries) {
      rows.push([
        itinerary.values.Sequencia,
        itinerary.values.PontoDeParada,
        moment(itinerary.values.Chegada).format('DD/MM/YY hh:mm'),
        moment(itinerary.values.Partida).format('DD/MM/YY hh:mm'),
        itinerary.values.Serviço,
        itinerary.values.Espera,
        itinerary.values.Livre,
        itinerary.values.Horas,
        itinerary.values.Serviços,
        itinerary.values.Endereço,
      ]);
    }
    return rows;
  };

  const itinerariesTableHead = [
    'Sequencia',
    'PontoDeParada',
    'Chegada',
    'Partida',
    'Serviço',
    'Espera',
    'Livre',
    'Horas',
    'Serviços',
    'Endereço',
  ];
  const itinerariesTableRows = makeTableRows();

  const onRowUpdate = () => {
    console.log('onRowUpdate ItineraryPage');
  };

  return (
    <div>
      <ResponsiveAppBar />
      <Box
        sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mb: 2 }}
      >
        <Button
          component={Link}
          to={`/itinerary/register`}
          variant='contained'
          color='primary'
        >
          Cadastrar
        </Button>
      </Box>
      <CustomTable
        tableHead={itinerariesTableHead}
        tableRows={itinerariesTableRows}
        onRowUpdate={onRowUpdate}
      />
    </div>
  );
};