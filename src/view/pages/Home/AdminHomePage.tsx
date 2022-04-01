import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { ResponsiveAppBar } from '../../components/Common/AppBar';

type Props = {};

export const AdminHomePage: FunctionComponent<Props> = ({}) => {
  return (
    <div>
      <ResponsiveAppBar />
      <Box
        sx={{
          flexGrow: 1,
          textAlign: 'center',
          fontSize: '3rem',
          fontWeight: '600',
          letterSpacing: 1.5,
        }}
      >
        {/* <Typography variant='h1'>GuardiaoTech</Typography> */}
        <br />

        <Card>
          <CardHeader title='GuardiaoTech' />
          <CardContent>Administrador Geral</CardContent>
        </Card>
      </Box>
    </div>
  );
};
