import React, { FunctionComponent, useEffect, useState } from 'react';
import { IFormField } from '../../../../domain/entities/FormField';
import { AlertSnackbar } from '../../Common/AlertSnackbar';
import { CompanyRepositoryDatabase } from '../../../../infra/repository/CompanyRepositoryDatabase';
import { Company } from '../../../../domain/entities/Company';
import { BaseCompayForm } from './BaseCompanyForm';
import { Dialog } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  company: Company;
  companyId: string;
};

export const EditCompanyForm: FunctionComponent<Props> = ({
  open,
  onClose,
  company,
  companyId,
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
    console.log(state);
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

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby={'EditCompanyForm'}>
      <BaseCompayForm onSave={onSave} initialState={initialState} />
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
