import React, { FunctionComponent, useState } from 'react';
import { AlertSnackbar } from '../../Common/AlertSnackbar';
import { BaseForm } from '../Base/BaseForm';
import { companyFormFields } from './companyFormFields';

type Props = {
  onSave: (state: any) => void;
  initialState?: object;
};

export const BaseCompanyForm: FunctionComponent<Props> = ({
  onSave,
  initialState,
}) => {
  return (
    <div>
      <BaseForm
        onSave={onSave}
        initialState={initialState}
        formFields={companyFormFields()}
        formTitle='Editar Transportadora'
      />
    </div>
  );
};
