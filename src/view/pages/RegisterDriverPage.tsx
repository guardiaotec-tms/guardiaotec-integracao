import React, { FunctionComponent } from 'react';
import { Paper, TextField } from '@mui/material';
import { RegisterDriverForm } from '../components/Forms/RegisterDriverForm';

type Props = {};

export const RegisterDriverPage: FunctionComponent<Props> = ({}) => {
  return (
    <div>
      <RegisterDriverForm />
    </div>
  );
};
