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
  const [itineraries, setItineraries] = useState<FT[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const repo = new FTRepositoryDatabase();
      const fts = await repo.getFTs();
      setItineraries(fts);
    };
    fetchVehicles();
  }, []);

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const ft of fts) {
      rows.push(['ft11']);
    }
    return rows;
  };

  const ftsTableHead = ['ft1'];
  const ftsTableRows = makeTableRows();

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
        tableHead={ftsTableHead}
        tableRows={ftsTableRows}
        onRowUpdate={onRowUpdate}
      />
    </div>
  );
};
