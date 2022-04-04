import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardHeader } from '@mui/material';
import {
  FormFieldValue,
  IFormField,
} from '../../../../domain/entities/FormField';
import { AlertSnackbar } from '../../Common/AlertSnackbar';
import { RenderFormField } from '../../FormField/RenderFormField';
import { CompanyRepositoryDatabase } from '../../../../infra/repository/CompanyRepositoryDatabase';
import { Company } from '../../../../domain/entities/Company';
import { makeInitialFormState } from '../Utils/makeInitialFormState';

type Props = {
  onSave: (state: any) => void;
  initialState?: object;
};

export const BaseCompayForm: FunctionComponent<Props> = ({
  onSave,
  initialState,
}) => {
  const [state, setState] = useState<any>({});
  const driverFields: IFormField[] = [
    { label: 'Numero de Contrato', type: 'Short Text', id: 0, index: 0 },
    { label: 'Código', type: 'Short Text', id: 1, index: 1 },
    { label: 'Transportadora', type: 'Short Text', id: 2, index: 2 },
    { label: 'CNPJ', type: 'CNPJ', id: 3, index: 3 },
    { label: 'Contato', type: 'Phone Number', id: 4, index: 4 },
    { label: 'Email', type: 'Email', id: 5, index: 5 },
    { label: 'Responsável', type: 'Short Text', id: 6, index: 6 },
  ];

  const startState = () =>
    setState(makeInitialFormState(driverFields, initialState));

  useEffect(() => {
    startState();
  }, []);

  const onChange = (label: string, value: FormFieldValue) => {
    setState({ ...state, [label]: value });
  };

  return (
    <Card sx={{ width: '400px', padding: '10px' }}>
      <CardHeader title='Cadastro de Transportadora' subheader='' />
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
          onClick={() => onSave(state)}
        >
          Salvar
        </Button>
      </CardActions>
    </Card>
  );
};
