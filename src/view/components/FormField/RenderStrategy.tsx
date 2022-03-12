import React, { FunctionComponent } from 'react';
import {
  FormFieldType,
  IFormField,
  FormFieldValue,
} from '../../../domain/entities/FormField';
import { FormFieldStrategyProps } from './Types';

type Props = {
  strategyComponent: FunctionComponent<FormFieldStrategyProps>;
  field: IFormField;
  onChange: (label: string, value: FormFieldValue) => void;
  value?: any;
};

export const RenderStrategy: FunctionComponent<Props> = ({
  strategyComponent: Component,
  field,
  onChange,
  value,
}) => {
  return (
    <Component
      label={field.label}
      options={field.options}
      onChange={onChange}
      value={value}
    />
  );
};
