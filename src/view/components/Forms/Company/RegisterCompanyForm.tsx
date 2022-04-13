import React, { FunctionComponent, useEffect, useState } from 'react';
import { AlertSnackbar } from '../../Common/AlertSnackbar';
import { CompanyRepositoryDatabase } from '../../../../infra/repository/CompanyRepositoryDatabase';
import { Company } from '../../../../domain/entities/Company';
import { BaseCompanyForm } from './BaseCompanyForm';
import { Box, Button, Card, CardActions, CardHeader } from '@mui/material';
import { RenderFormField } from '../../FormField/RenderFormField';

type Props = {};

export const RegisterCompanyForm: FunctionComponent<Props> = ({}) => {
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };

  const onSave = async (state: any) => {
    try {
      const company = new Company(state);
      const repo = new CompanyRepositoryDatabase();
      await repo.addCompany(company);
      setSuccessMessage('Transportadora atualizada!');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <BaseCompanyForm onSave={onSave} />
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
    </div>
  );
};
