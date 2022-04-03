import React, { FunctionComponent, useState } from 'react';
import TextField from '@mui/material/TextField';
import { FormFieldStrategyProps } from './Types';
import validator from 'validator';

export const EmailFormField: FunctionComponent<FormFieldStrategyProps> = ({
  value,
  label,
  onChange,
}) => {
  const [helperText, setHelperText] = useState('');

  const handleChange = (event: any) => {
    const value = event.target.value;
    if (value.length > 6 && !validator.isEmail(value)) {
      setHelperText('Invalid mail');
    } else {
      setHelperText('');
    }
    onChange(label, value);
  };

  return (
    <TextField
      helperText={helperText}
      error={!!helperText}
      value={value || ''}
      label={label}
      onChange={handleChange}
      variant='outlined'
      fullWidth
    />
  );
};
