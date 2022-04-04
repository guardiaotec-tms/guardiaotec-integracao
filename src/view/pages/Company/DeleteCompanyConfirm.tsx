import React, { FunctionComponent, useEffect, useState } from 'react';
import { IFormField } from '../../../domain/entities/FormField';
import { Company } from '../../../domain/entities/Company';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { CompanyRepositoryDatabase } from '../../../infra/repository/CompanyRepositoryDatabase';
import { AlertSnackbar } from '../../components/Common/AlertSnackbar';

type Props = {
  open: boolean;
  onClose: () => void;
  company: Company;
  companyId: string;
  targetName: string;
};

export const DeleteCompanyConfirm: FunctionComponent<Props> = ({
  open,
  onClose,
  company,
  companyId,
  targetName,
}) => {
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [initialState, setInitialState] = useState<any>();

  useEffect(() => {
    let initialState: any = {};
    for (const field in company.values) {
      //@ts-ignore
      initialState[field] = company.values[field];
    }
    setInitialState(initialState);
  }, [company]);

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };

  const onSave = async (state: any) => {
    try {
      const company = new Company(state);
      const repo = new CompanyRepositoryDatabase();
      console.log(companyId);
      await repo.updateCompany(company, companyId);
      //   await repo.addCompany(company);
      setSuccessMessage('Transportadora atualizada!');
      onClose();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const onDelete = async () => {
    try {
      const repo = new CompanyRepositoryDatabase();
      console.log(companyId);
      await repo.deleteCompany(companyId);
      //   await repo.addCompany(company);
      setSuccessMessage('Transportadora deletada!');
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
        <Button variant='text' color='warning' onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onDelete} color='primary'>
          Delete
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
