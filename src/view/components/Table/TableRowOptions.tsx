import React, { FunctionComponent, useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {
  Button,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import { EditField } from '../../../../../../../NodeJS/Typescript/Formfy 2.0/client/src/views/components/FormFieldsManageTable/EditField';
// import { DeleteField } from '../../../../../../../NodeJS/Typescript/Formfy 2.0/client/src/views/components/FormFieldsManageTable/DeleteField';
// import { IFormField } from '../../../../../../../NodeJS/Typescript/Formfy 2.0/client/src/domain/entities/FormField';

type Props = {
  // toggleOptionsPopover: () => void;
  // formId: number;
  // field: any;
};

export const TableRowOptions: FunctionComponent<Props> = (
  {
    // toggleOptionsPopover,
    // formId,
    // field,
  }
) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [inEditField, setInEditField] = useState(false);
  const [inDeleteField, setInDeleteField] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const toggleInEditField = () => {
    setInEditField((prev) => !prev);
  };

  const onCloseEditField = () => {
    setInEditField(false);
    handleClose();
  };

  const toggleInDeleteField = () => setInDeleteField((prev) => !prev);

  return (
    <div>
      <IconButton aria-describedby={id} color='secondary' onClick={handleClick}>
        <MoreHorizIcon />
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
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component='nav'
          aria-labelledby='nested-list-subheader'
          subheader={
            <ListSubheader component='div' id='nested-list-subheader'>
              Opções
            </ListSubheader>
          }
        >
          <ListItemButton onClick={toggleInEditField}>
            <EditIcon></EditIcon>
            <ListItemText primary='Edit Field' />
          </ListItemButton>
          <ListItemButton onClick={toggleInDeleteField}>
            <DeleteIcon></DeleteIcon>
            <ListItemText primary='Delete Field' />
          </ListItemButton>
        </List>
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
        {/* {inEditField && (
          <EditField
            formId={formId}
            field={field}
            open={inEditField}
            toggleOpen={onCloseEditField}
          />
        )}
        {inDeleteField && (
          <DeleteField
            formId={formId}
            field={field}
            inDeleteField={inDeleteField}
            onCancelDelete={toggleInDeleteField}
          />
        )} */}
      </Popover>
    </div>
  );
};
