import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardHeader } from '@mui/material';
import { Driver } from '../../../../domain/entities/Driver';
import {
  FormFieldValue,
  IFormField,
} from '../../../../domain/entities/FormField';
import { DriverRepositoryDatabase } from '../../../../infra/repository/DriverRepositoryDatabase';
import { AlertSnackbar } from '../../Common/AlertSnackbar';
import { RenderFormField } from '../../FormField/RenderFormField';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../application/store/configureStore';
import { makeInitialFormState } from '../Utils/makeInitialFormState';

type Props = {
  initialState?: object;
};

export const RegisterDriverForm: FunctionComponent<Props> = ({
  initialState,
}) => {
  const [state, setState] = useState<any>({});
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  const driverFields: IFormField[] = [
    { label: 'Nome', type: 'Short Text', id: 0, index: 0 },
    { label: 'Contato', type: 'Phone Number', id: 2, index: 2 },
    { label: 'CNH', type: 'Short Text', id: 1, index: 1 },
    { label: 'Vencimento', type: 'Date', id: 3, index: 3 },
  ];

  const startState = () =>
    setState(initialState ? initialState : makeInitialFormState(driverFields));
  const resetState = () => setState(makeInitialFormState(driverFields));

  useEffect(() => {
    startState();
  }, []);

  const onChange = (label: string, value: FormFieldValue) => {
    setState({ ...state, [label]: value });
  };

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };

  const onSave = async () => {
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
        resetState();
      } else if (userCompanyId) {
        await repo.addDriver(driver, userCompanyId);
        setSuccessMessage('Motorista cadastrado!');
        resetState();
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Card sx={{ width: '400px', padding: '10px' }}>
      <CardHeader title='Cadastro de Motorista' subheader='' />
      {driverFields.map((field: IFormField) => {
        return (
          <Box sx={{ mb: '10px' }} key={field.id}>
            <RenderFormField
              field={field}
              onChange={onChange}
              value={state[field.label]}
            />
          </Box>
        );
      })}

      <CardActions>
        <Button
          variant='contained'
          color='primary'
          size='small'
          onClick={onSave}
        >
          Salvar
        </Button>
      </CardActions>
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
    </Card>
  );
};
