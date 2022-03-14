import React, { FunctionComponent } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { FormFieldStrategyProps } from './Types';
import ptLocale from 'date-fns/locale/pt-BR';

export const DateFormField: FunctionComponent<FormFieldStrategyProps> = ({
  label,
  onChange,
  value,
}) => {
  // const [value, setValue] = React.useState<Date | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
      <DatePicker
        label={label}
        value={value ? value : null}
        onChange={(newValue) => {
          onChange(label, newValue ? newValue : new Date());
        }}
        renderInput={(params) => <TextField {...params} fullWidth />}
        // inputFormat='dd/mm/yyyy'
      />
    </LocalizationProvider>
  );
};
