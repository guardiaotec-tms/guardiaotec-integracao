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
import { useSelector } from 'react-redux';
import { RootState } from '../../../application/store/configureStore';
import { CompanyFilter } from '../../components/Filter/CompanyFilter';
import { canRegister } from '../../../application/service/canRegister';
import { LTUFilter } from '../../components/Filter/LTUFilter';
import { RowCommand } from '../../components/Table/TableRowOptions';

type Props = {};

export const ItineraryPage: FunctionComponent<Props> = ({}) => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { userCompanyId, adminSelectedCompanyId, selectedLTU } = useSelector(
    (state: RootState) => state.companies
  );

  const fetchItinerariesFromLTU = async (LTU: string) => {
    const repo = new ItineraryRepositoryDatabase();
    const itineraries = await repo.getItinerariesFromLTU(LTU);
    setItineraries(itineraries);
  };

  useEffect(() => {
    fetchItinerariesFromLTU(selectedLTU);
  }, [selectedLTU]);

  const makeTableRows = () => {
    let rows: string[][] = [];
    itineraries.sort(
      (i1: any, i2: any) => i1.values.Sequencia - i2.values.Sequencia
    );

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
    '',
  ];
  const itinerariesTableRows = makeTableRows();

  const onRowCommand = (command: RowCommand, row: string[]) => {
    console.log(command, row);
    console.log('onRowUpdate driverPage');
  };

  return (
    <div>
      <ResponsiveAppBar />
      {isAdmin && <CompanyFilter />}
      {/* {isAdmin && <LTUFilter />} */}
      <LTUFilter />
      <Box
        sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mb: 2 }}
      >
        <Button
          component={Link}
          to={`/itinerary/register`}
          variant='contained'
          color='primary'
          disabled={!canRegister()}
        >
          Cadastrar
        </Button>
      </Box>
      <CustomTable
        tableHead={itinerariesTableHead}
        tableRows={itinerariesTableRows}
        onRowCommand={onRowCommand}
      />
    </div>
  );
};
