import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const pages = [
  {
    name: 'Transportadora',
    path: '/company',
  },
  {
    name: 'Motorista',
    path: '/driver',
  },
  {
    name: 'Veículo',
    path: '/vehicle',
  },
  {
    name: 'Escala de Trabalho',
    path: '/workscale',
  },
  {
    name: 'Linha de Distribuição',
    path: '/itinerary',
  },
];

export const ResponsiveAppBar = () => {
  // const handleRedirect = (page) => {};

  return (
    <AppBar position='static' sx={{ marginBottom: '15px' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              verticalAlign: 'center',
            }}
          >
            {/* <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              LOGO
            </Typography> */}

            {pages.map((page) => (
              <Button
                component={Link}
                to={`${page.path}`}
                key={page.name}
                // onClick={() => handleRedirect(page)}
                sx={{ mx: 1, my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
