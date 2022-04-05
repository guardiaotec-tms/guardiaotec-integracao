import React, { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import { RegisterItineraryForm } from '../../components/Forms/Itinerary/RegisterItineraryForm';
import { ResponsiveAppBar } from '../../components/Common/AppBar';

type Props = {};

export const RegisterItineraryPage: FunctionComponent<Props> = ({}) => {
  return (
    <div>
      <ResponsiveAppBar />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <RegisterItineraryForm />
      </Box>
    </div>
  );
};
