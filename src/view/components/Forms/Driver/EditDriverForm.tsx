import React, { FunctionComponent, useEffect, useState } from 'react';
import { AlertSnackbar } from '../../Common/AlertSnackbar';
import { Dialog } from '@mui/material';
import { BaseDriverForm } from './BaseDriverForm';
import { Driver } from '../../../../domain/entities/Driver';
import { DriverRepositoryDatabase } from '../../../../infra/repository/DriverRepositoryDatabase';
import { RootState } from '../../../../application/store/configureStore';
import { useSelector } from 'react-redux';
import { makeInitialFormState } from '../Utils/makeInitialFormState';
import { driverFormFields } from './driverFormFields';
import { selectCurrentRelatedCompanyId } from '../../../../infra/services/selectCurrentRelatedCompanyId';

type Props = {
  open: boolean;
  onClose: () => void;
  driver: Driver;
  driverId: string;
};

export const EditDriverForm: FunctionComponent<Props> = ({
  open,
  onClose,
  driver,
  driverId,
}) => {
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [initialState, setInitialState] = useState<any>();
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  //   const startState = () =>
  //     setState(initialState ? initialState : makeInitialFormState(driverFields));
  const resetState = (setState: any) =>
    setState(makeInitialFormState(driverFormFields()));

  useEffect(() => {
    const func = () => {
      let initialState: any = {};
      // for (const field in driver.values) {
      //   //@ts-ignore
      //   initialState[field] = driver.values[field];
      // }
      if (!driver) return;
      initialState.Nome = driver.values.nome;
      initialState.CNH = driver.values.cnh;
      initialState.Contato = driver.values.contato;
      initialState.Vencimento = driver.values.vencimento;

      setInitialState(initialState);
    };
    func();
  }, [driver]);

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };

  const onSave = async (state: any, setState: any) => {
    try {
      for (const key in state)
        if (!state[key]) throw new Error(`Campo ${key} inv??lido!`);

      const driverValues = {
        nome: state.Nome,
        cnh: state.CNH,
        contato: state.Contato,
        vencimento: state.Vencimento,
      };

      //@ts-ignore
      const driver = new Driver(driverValues);
      const repo = new DriverRepositoryDatabase();
      const companyId = selectCurrentRelatedCompanyId();
      if (!companyId)
        throw new Error(
          'Id de transportadora n??o identificado! Imposs??vel salvar Motorista!'
        );
      await repo.updateDriver(driver, companyId, driverId);
      setSuccessMessage('Motorista atualizado!');
      resetState(setState);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby={'EditDriverForm'}>
      <BaseDriverForm onSave={onSave} initialState={initialState} />
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
