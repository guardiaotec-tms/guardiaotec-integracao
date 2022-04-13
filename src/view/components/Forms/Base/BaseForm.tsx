import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardHeader } from '@mui/material';
import {
  FormFieldValue,
  IFormField,
} from '../../../../domain/entities/FormField';
import { RenderFormField } from '../../FormField/RenderFormField';
import { makeInitialFormState } from '../Utils/makeInitialFormState';

type Props = {
  onSave: (state: any, setState?: React.Dispatch<any>) => void;
  initialState?: object;
  formFields: IFormField[];
  formTitle: string;
  injectedFormFieldsComponents?: any[];
};

export const BaseForm: FunctionComponent<Props> = ({
  onSave,
  initialState,
  formFields,
  formTitle,
  injectedFormFieldsComponents,
}) => {
  const [state, setState] = useState<any>({});

  const startState = () =>
    setState(makeInitialFormState(formFields, initialState));

  useEffect(() => {
    startState();
  }, []);

  const onChange = (label: string, value: FormFieldValue) => {
    setState({ ...state, [label]: value });
  };

  return (
    <Card sx={{ width: '400px', padding: '10px' }}>
      <CardHeader title={formTitle} subheader='' />
      {formFields.map((field: IFormField) => {
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
      {injectedFormFieldsComponents}
      <CardActions>
        <Button
          variant='contained'
          color='primary'
          size='small'
          onClick={() => onSave(state, setState)}
        >
          Salvar
        </Button>
      </CardActions>
    </Card>
  );
};
