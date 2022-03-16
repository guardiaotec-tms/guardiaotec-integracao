import React, { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import { RegisterFTForm } from '../../components/Forms/RegisterFTForm';
import { ResponsiveAppBar } from '../../components/Common/AppBar';

type Props = {};

export const RegisterFTPage: FunctionComponent<Props> = ({}) => {
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
        <RegisterFTForm />
      </Box>
    </div>
  );
};
