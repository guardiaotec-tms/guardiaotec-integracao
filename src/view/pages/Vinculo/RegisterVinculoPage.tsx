import React, { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import { RegisterVinculoForm } from '../../components/Forms/Vinculo/RegisterVinculoForm';
import { ResponsiveAppBar } from '../../components/Common/AppBar';

type Props = {};

export const RegisterVinculoPage: FunctionComponent<Props> = ({}) => {
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
        <RegisterVinculoForm />
      </Box>
    </div>
  );
};
