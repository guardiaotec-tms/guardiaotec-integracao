import React, { FunctionComponent } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { RegisterDriverPage } from '../view/pages/RegisterDriverPage';
import App from '../App';

type Props = {};

export const AppRoutes: FunctionComponent<Props> = ({}) => {
  return (
    <Routes>
      <Route path='/registerDriver' element={<RegisterDriverPage />} />
      <Route path='/' element={<App />}></Route>
    </Routes>
  );
};
