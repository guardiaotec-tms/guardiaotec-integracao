import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardHeader } from '@mui/material';
import { Vehicle } from '../../../domain/entities/Vehicle';
import { FormFieldValue, IFormField } from '../../../domain/entities/FormField';
import { AlertSnackbar } from '../Common/AlertSnackbar';
import { RenderFormField } from '../FormField/RenderFormField';
import { VehicleRepositoryDatabase } from '../../../infra/repository/VehicleRepositoryDatabase';

type Props = {};

const makeInitialFormState = (formFields: IFormField[]) => {
  let state: any = {};
  for (const field of formFields) {
    state[field.label] = '';
  }
  return state;
};

export const RegisterVehicleForm: FunctionComponent<Props> = ({}) => {
  const [state, setState] = useState<any>({});
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  //MARCA	MODELO	COR 	ANO FABRICAÇÃO 	ANO MODELO 	PLACA 	CAPACIDADE DE CARGA  m3
  const driverFields: IFormField[] = [
    { label: 'Marca', type: 'Short Text', id: 0, index: 0 },
    { label: 'Modelo', type: 'Short Text', id: 1, index: 1 },
    { label: 'Cor', type: 'Short Text', id: 2, index: 2 },
    { label: 'Ano Fabricação', type: 'Year', id: 3, index: 3 },
    { label: 'Ano Modelo', type: 'Year', id: 4, index: 4 },
    { label: 'Placa', type: 'Short Text', id: 5, index: 5 },
    { label: 'Capacidade(m3)', type: 'Short Text', id: 6, index: 6 },
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
      for (const key in state)
        if (!state[key]) throw new Error(`Campo ${key} inválido!`);

      const vehicle = new Vehicle(state);
      const repo = new VehicleRepositoryDatabase();
      await repo.addVehicle(vehicle);
      setSuccessMessage('Veículo cadastrado!');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Card sx={{ width: '400px', padding: '10px' }}>
      <CardHeader
        // avatar={<Avatar aria-label=''></Avatar>}
        // action={<IconButton aria-label=''></IconButton>}
        title='Cadastro de Veículo'
        subheader=''
      />
      {driverFields.map((field: IFormField) => {
        return (
          <Box sx={{ mb: '10px' }} key={field.id}>
            {/* <div>
                  <b>{field.label}</b>
                </div> */}
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
