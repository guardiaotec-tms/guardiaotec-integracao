import React, { FunctionComponent, useEffect, useState } from 'react';
import { BaseForm } from '../Base/BaseForm';
import { useVinculoFormFields } from './useVinculoFormFields';

type Props = {
  onSave: (state: any, setState?: any) => void;
  initialState?: object;
};

export const BaseVinculoForm: FunctionComponent<Props> = ({
  onSave,
  initialState,
}) => {
  const vinculoFields = useVinculoFormFields();

  return (
    <div>
      <BaseForm
        onSave={onSave}
        initialState={initialState}
        formFields={vinculoFields}
        formTitle='Editar Vínculo'
      />
    </div>
  );
};
