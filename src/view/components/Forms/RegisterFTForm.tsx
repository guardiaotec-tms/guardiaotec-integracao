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
    { label: 'Nº da FT', type: 'Short Text', id: 0, index: 0 },
    { label: 'Nº da Linha', type: 'Short Text', id: 1, index: 1 },
    { label: 'Origem', type: 'Short Text', id: 2, index: 2 },
    { label: 'Destino', type: 'Short Text', id: 3, index: 3 },
    { label: 'Data de Vigencia Início', type: 'Date', id: 4, index: 4 },
    { label: 'Data de Vigencia Fim', type: 'Date', id: 5, index: 5 },
    {
      label: 'Tipo de Linha',
      type: 'List Selection',
      options: ['Contratada'],
      id: 6,
      index: 6,
    },
    {
      label: 'Frequência',
      type: 'Checkbox',
      options: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      id: 7,
      index: 7,
    },
    { label: 'LTU', type: 'Short Text', id: 8, index: 8 },
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
