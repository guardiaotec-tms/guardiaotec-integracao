import React, { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import { RegisterCompanyForm } from '../../components/Forms/Company/RegisterCompanyForm';
import { ResponsiveAppBar } from '../../components/Common/AppBar';

type Props = {};

export const EditCompanyPage: FunctionComponent<Props> = ({}) => {
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
