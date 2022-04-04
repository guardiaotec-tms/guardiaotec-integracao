import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { AlertSnackbar } from '../../components/Common/AlertSnackbar';

type Props = {
  open: boolean;
  onClose: () => void;
  targetName: string;
  targetId: string;
  onDelete: (targetId: string) => Promise<void>;
};

export const DeleteConfirmDialog: FunctionComponent<Props> = ({
  open,
  onClose,
  targetId,
  onDelete,
  targetName,
}) => {
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };

  const onConfirm = async () => {
    try {
      await onDelete(targetId);
      setSuccessMessage(`${targetName}  deletado!`);
      onClose();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={'delete-company-confirmation'}
    >
      <DialogTitle id={'delete-company-dialog'}>
        Remover {targetName}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='error' onClick={onClose} variant='outlined'>
          Cancelar
        </Button>
        <Button onClick={onConfirm} color='primary' variant='contained'>
          Deletar
        </Button>
      </DialogActions>
      <AlertSnackbar
        open={!!successMessage}
        onClose={onAlertClose}
        severity='success'
      >
        {successMessage}
      </AlertSnackbar>
      <AlertSnackbar open={!!error} onClose={onAlertClose} severity='error'>
        {error}
      </AlertSnackbar>
    </Dialog>
  );
};
