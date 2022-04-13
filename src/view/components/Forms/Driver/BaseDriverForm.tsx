import React, { FunctionComponent, useState } from 'react';
import { AlertSnackbar } from '../../Common/AlertSnackbar';
import { BaseForm } from '../Base/BaseForm';
import { driverFormFields } from './driverFormFields';

type Props = {
  onSave: (state: any, setState?: any) => void;
  initialState?: object;
  injectedFormFieldsComponents?: any;
};

export const BaseDriverForm: FunctionComponent<Props> = ({
  onSave,
  initialState,
  injectedFormFieldsComponents,
}) => {
  return (
    <div>
      <BaseForm
        onSave={onSave}
        initialState={initialState}
        formFields={driverFormFields()}
        formTitle='Cadastrar Motorista'
        injectedFormFieldsComponents={injectedFormFieldsComponents}
      />
    </div>
  );
};
