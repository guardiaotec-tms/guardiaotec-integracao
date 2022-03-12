import React, { FunctionComponent } from 'react';
import { Paper, TextField } from '@mui/material';
import { RegisterDriverForm } from '../components/Forms/RegisterDriverForm';
import { Box } from '@mui/material';

type Props = {};

export const RegisterDriverPage: FunctionComponent<Props> = ({}) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <RegisterDriverForm />
    </Box>
  );
};
