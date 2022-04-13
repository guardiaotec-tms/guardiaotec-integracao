import { Box } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { FileUploader } from '../../Common/FileUploader';
import { BaseForm } from '../Base/BaseForm';
import { vehicleFormFields } from './vehicleFormFields';

type Props = {
  onSave: (state: any, setState?: any) => void;
  initialState?: object;
  injectedFormFieldsComponents?: any;
};

export const BaseVehicleForm: FunctionComponent<Props> = ({
  onSave,
  initialState,
  injectedFormFieldsComponents,
}) => {
  return (
    <div>
      <BaseForm
        onSave={onSave}
        initialState={initialState}
        formFields={vehicleFormFields()}
        formTitle='Editar Vaículo'
        injectedFormFieldsComponents={injectedFormFieldsComponents}
      />
    </div>
  );
};
