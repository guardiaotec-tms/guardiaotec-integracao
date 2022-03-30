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
    const fetchItineraries = async () => {
      const repo = new ItineraryRepositoryDatabase();
      const itineraries = await repo.getItineraries();
      setItineraries(itineraries);
    };
    fetchItineraries();
  }, []);

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const itinerary of itineraries) {
      rows.push([
        itinerary.values['LTU Correspondente'],
        itinerary.values.Sequencia,
        itinerary.values.CTO,
        itinerary.values['Ponto De Parada'],
        itinerary.values.Km,
        moment(itinerary.values.Chegada).format('HH:mm'),
        moment(itinerary.values.Partida).format('HH:mm'),
        moment(itinerary.values.Serviço).format('HH:mm'),
        moment(itinerary.values.Espera).format('HH:mm'),
        moment(itinerary.values.Livre).format('HH:mm'),
        moment(itinerary.values.Horas).format('HH:mm'),
        itinerary.values.Serviços,
        itinerary.values.Endereço,
      ]);
    }
    return rows;
  };

  const itinerariesTableHead = [
    'LTU Correspondente',
    'Sequencia',
    'CTO',
    'Ponto De Parada',
    'KM',
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
