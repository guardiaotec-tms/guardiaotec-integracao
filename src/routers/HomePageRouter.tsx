import React, { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';
// import { RootState } from '../../../application/store/configureStore';
import { useSelector } from 'react-redux';
import { RootState } from '../application/store/configureStore';
import { AdminHomePage } from '../view/pages/Home/AdminHomePage';
import { RegularHomePage } from '../view/pages/Home/RegularHomePage';

type Props = {};

export const HomePageRouter: FunctionComponent<Props> = ({}) => {
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      {isAdmin ? (
        <Route path='/' element={<AdminHomePage />} />
      ) : (
        <Route path='/' element={<RegularHomePage />} />
      )}
    </Routes>
  );
};
