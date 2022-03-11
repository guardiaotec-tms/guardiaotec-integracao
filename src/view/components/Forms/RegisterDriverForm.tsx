import { Box, Button, Card, CardActions } from '@mui/material';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { CPF } from '../../../domain/entities/CPF';
import { Driver } from '../../../domain/entities/Driver';
import { FormFieldValue, IFormField } from '../../../domain/entities/FormField';
import { DriverRepositoryDatabase } from '../../../infra/repository/DriverRepositoryDatabase';
import { AlertSnackbar } from '../Common/AlertSnackbar';
import { RenderFormField } from '../FormField/RenderFormField';

type Props = {};

const makeInitialFormState = (formFields: IFormField[]) => {
  let state: any = {};
  for (const field of formFields) {
    state[field.label] = '';
  }
  return state;
};

export const RegisterDriverForm: FunctionComponent<Props> = ({}) => {
  const [state, setState] = useState<any>({});
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const driverFields: IFormField[] = [
    { label: 'name', type: 'Short Text', id: 0, index: 0 },
    { label: 'CPF', type: 'CPF', id: 1, index: 1 },
  ];

  const startState = () => setState(makeInitialFormState(driverFields));

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
      const cpf = new CPF(state.CPF);
      const driver = new Driver(state.name, cpf);
      const repo = new DriverRepositoryDatabase();
      await repo.addDriver(driver);
      setSuccessMessage('Motorista cadastrado!');
      startState();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Card sx={{ maxWidth: '400px', padding: '10px' }}>
      {driverFields.map((field: IFormField) => {
        return (
          <Box sx={{ mb: '10px' }} key={field.id}>
            {/* <div>
                  <b>{field.label}</b>
                </div> */}
            <RenderFormField field={field} onChange={onChange} />
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
      <AlertSnackbar open={!!error} onClose={onAlertClose} severity='warning'>
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
