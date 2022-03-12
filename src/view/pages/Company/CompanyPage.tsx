import React, { FunctionComponent } from 'react';
import { Paper, TextField } from '@mui/material';
import { RegisterDriverForm } from '../../components/Forms/RegisterDriverForm';
import { Box, Button } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';
import { Link } from 'react-router-dom';

type Props = {};

export const CompanyPage: FunctionComponent<Props> = ({}) => {
  return (
    <div>
      <ResponsiveAppBar />
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <Button
          component={Link}
          to={`/company/register`}
          variant='contained'
          color='primary'
        >
          Cadastrar
        </Button>
      </Box>
      CompanyPage
      {/* <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <RegisterDriverForm />
      </Box> */}
    </div>
  );
};
