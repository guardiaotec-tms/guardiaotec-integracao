import React, { FunctionComponent } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { FormFieldStrategyProps } from './Types';

export const YearFormField: FunctionComponent<FormFieldStrategyProps> = ({
  label,
  onChange,
  value,
}) => {
  // const [value, setValue] = React.useState<Date | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        views={['year']}
        label={label}
        value={value ? value : null}
        onChange={(newValue) => {
          onChange(label, newValue ? newValue : new Date());
        }}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
    </LocalizationProvider>
  );
};
