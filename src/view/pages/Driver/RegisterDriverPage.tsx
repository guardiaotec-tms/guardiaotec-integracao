import React, { FunctionComponent } from 'react';
import { Paper, TextField } from '@mui/material';
import { RegisterDriverForm } from '../../components/Forms/RegisterDriverForm';
import { Box } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';

type Props = {};

export const RegisterDriverPage: FunctionComponent<Props> = ({}) => {
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
        <RegisterDriverForm />
      </Box>
    </div>
  );
};
