import { TextField } from '@mui/material';
import React, { ChangeEvent, FormEvent, FunctionComponent } from 'react';
import { useState } from 'react';

type Props = {};

export const LoginPage: FunctionComponent<Props> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const adminId = useSelector((state: RootState) => state.auth.adminId);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(email, password);

    // loginAdmin(email, password, setAdminId);
  };

  return (
    <>
      <form
        // className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={onFormSubmit}
      >
        <TextField
          id='standard-basic'
          type='email'
          value={email}
          onChange={handleEmail}
          label='E-mail'
        />
        <TextField
          id='standard-basic'
          type='password'
          value={password}
          onChange={handlePassword}
          label='Password'
        />
      </form>
    </>
  );
};
