import { Box, Button, Card, CardActions, CardHeader } from '@mui/material';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { FormFieldValue, IFormField } from '../../../domain/entities/FormField';
import { AlertSnackbar } from '../Common/AlertSnackbar';
import { RenderFormField } from '../FormField/RenderFormField';
import { FTRepositoryDatabase } from '../../../infra/repository/FTRepositoryDatabase';
import { FT } from '../../../domain/entities/FT';

type Props = {};

const makeInitialFormState = (formFields: IFormField[]) => {
  let state: any = {};
  for (const field of formFields) {
    state[field.label] = '';
  }
  return state;
};

export const RegisterFTForm: FunctionComponent<Props> = ({}) => {
  const [state, setState] = useState<any>({});
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const ftFields: IFormField[] = [
    { label: 'Nº da FT', type: 'Short Text' },
    { label: 'Nº da Linha', type: 'Short Text' },
    {
      label: 'Frequência',
      type: 'Checkbox',
      options: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    },
    { label: 'Sequencia', type: 'Short Text' },
    { label: 'Ponto De Parada', type: 'Short Text' },
    { label: 'Chegada', type: 'Date and Time' },
    { label: 'Partida', type: 'Date and Time' },
    { label: 'Serviço', type: 'Short Text' },
    { label: 'Espera', type: 'Short Text' },
    { label: 'Livre', type: 'Short Text' },
    { label: 'Horas', type: 'Short Text' },
    { label: 'Serviços', type: 'Short Text' },
    { label: 'Endereço', type: 'Short Text' },
    { label: 'LTU', type: 'Short Text' },
  ];

  const startState = () => setState(makeInitialFormState(ftFields));

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
      const ft = new FT(state);
      const repo = new FTRepositoryDatabase();
      await repo.addFT(ft);
      setSuccessMessage('Ficha Técnica cadastrada!');
      startState();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Card sx={{ width: '400px', padding: '10px' }}>
      <CardHeader title='Cadastro de Ficha Técnica' subheader='' />
      {ftFields.map((field: IFormField) => {
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
