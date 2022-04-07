import React, { FunctionComponent } from 'react';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

type Props = {};

export const GuardiaoTecInfoBox: FunctionComponent<Props> = ({}) => {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          //   textAlign: 'center',
          //   fontSize: '3rem',
          //   fontWeight: '600',
          display: 'flex',
          justifyContent: 'center',
          //   letterSpacing: 1.5,
        }}
      >
        {/* <Typography variant='h1'>GuardiaoTech</Typography> */}
        <br />

        <Card
          sx={{
            width: 600,
            backgroundColor: '#eeeeff',
          }}
        >
          <CardHeader title='GuardiaoTec' />
          <CardContent>
            <Box
              sx={{
                border: '1px solid #ccccff',
                borderRadius: '5px',
                boxSizing: 'border-box',
                // width: 500,
                width: '100%',
                padding: 1,
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    display: 'flex',
                    verticalAlign: 'center',
                    width: '20px',
                    flexDirection: 'vertical',
                    marginRight: 0.7,
                  }}
                >
                  <LocalPhoneIcon sx={{ transform: 'scale(0.8)' }} />
                </Box>
                <b>Central de atendimento:</b> 0800 100 1144
              </Box>
              <br />
              <Box sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    display: 'flex',
                    verticalAlign: 'center',
                    width: '20px',
                    flexDirection: 'vertical',
                    marginRight: 0.7,
                  }}
                >
                  <WhatsAppIcon sx={{ transform: 'scale(0.8)' }} />
                </Box>
                <b> Whatsapp:</b> +55 (11) 98240-1983
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
