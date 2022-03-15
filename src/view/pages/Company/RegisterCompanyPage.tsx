import React, { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import { RegisterCompanyForm } from '../../components/Forms/RegisterCompanyForm';
import { ResponsiveAppBar } from '../../components/Common/AppBar';

type Props = {};

export const RegisterCompanyPage: FunctionComponent<Props> = ({}) => {
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
        <RegisterCompanyForm />
      </Box>
    </div>
  );
};
