import React, { FunctionComponent } from 'react';
import { Box, Paper, TextField } from '@mui/material';
import { RegisterVehicleForm } from '../components/Forms/RegisterVehicleForm';

type Props = {};

export const RegisterVehiclePage: FunctionComponent<Props> = ({}) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <RegisterVehicleForm />
    </Box>
  );
};
