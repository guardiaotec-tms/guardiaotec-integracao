import React, { FunctionComponent, useEffect, useState } from 'react';
import { Driver } from '../../../../domain/entities/Driver';
import { DriverRepositoryDatabase } from '../../../../infra/repository/DriverRepositoryDatabase';
import { AlertSnackbar } from '../../Common/AlertSnackbar';
import { RenderFormField } from '../../FormField/RenderFormField';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../application/store/configureStore';
import { makeInitialFormState } from '../Utils/makeInitialFormState';
import { BaseDriverForm } from './BaseDriverForm';
import { driverFormFields } from './driverFormFields';

type Props = {};

export const RegisterDriverForm: FunctionComponent<Props> = ({}) => {
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  const resetState = (setState: any) =>
    setState(makeInitialFormState(driverFormFields()));

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };

  const onSave = async (state: any, setState: any) => {
    try {
      for (const key in state)
        if (!state[key]) throw new Error(`Campo ${key} inválido!`);

      const driverValues = {
        nome: state.Nome,
        cnh: state.CNH,
        contato: state.Contato,
        vencimento: state.Vencimento,
      };

      const driver = new Driver(driverValues);
      const repo = new DriverRepositoryDatabase();

      if (isAdmin && adminSelectedCompanyId) {
        await repo.addDriver(driver, adminSelectedCompanyId);
        setSuccessMessage('Motorista cadastrado!');
        resetState(setState);
      } else if (userCompanyId) {
        await repo.addDriver(driver, userCompanyId);
        setSuccessMessage('Motorista cadastrado!');
        resetState(setState);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <BaseDriverForm onSave={onSave} />
      <AlertSnackbar open={!!error} onClose={onAlertClose} severity='error'>
        {error}
      </AlertSnackbar>
      <AlertSnackbar
        open={!!successMessage}
        onClose={onAlertClose}
        severity='success'
      >
        {successMessage}
      </AlertSnackbar>
    </div>
  );
};
