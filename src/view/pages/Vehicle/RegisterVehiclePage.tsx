import React, { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import { RegisterVehicleForm } from '../../components/Forms/RegisterVehicleForm';
import { ResponsiveAppBar } from '../../components/Common/AppBar';

type Props = {};

export const RegisterVehiclePage: FunctionComponent<Props> = ({}) => {
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
        <RegisterVehicleForm />
      </Box>
    </div>
  );
};
