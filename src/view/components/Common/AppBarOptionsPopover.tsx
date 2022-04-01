import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';
import { signOut } from '../../../firebase/auth';
import { RootState } from '../../../application/store/configureStore';
import { useSelector } from 'react-redux';

export function AppBarOptionsPopover() {
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box>
      <IconButton
        // aria-describedby={id}
        // variant='contained'
        onClick={handleClick}
        sx={{ color: 'white' }}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
        <MenuItem>
          <Button
            onClick={() => {
              signOut();
            }}
          >
            <LogoutIcon sx={{ marginRight: 1 }} /> Sair (Logout)
          </Button>
        </MenuItem>
        {isAdmin && (
          <MenuItem>
            <Button component={Link} to='/adicionarusuario'>
              <AddCircleIcon sx={{ marginRight: 1 }} /> Adicionar Usuário
            </Button>
          </MenuItem>
        )}
      </Popover>
    </Box>
  );
}
