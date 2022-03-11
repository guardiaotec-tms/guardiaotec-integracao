import React from 'react';
import { Box, Grid } from '@mui/material';

export const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        bottom: 0,
        left: 0,
        // flexGrow: 1,
        position: 'absolute',
        width: '100%',
        height: 5,
      }}
    ></Box>
  );
};
