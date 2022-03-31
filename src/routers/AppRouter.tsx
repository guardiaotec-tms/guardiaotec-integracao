import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { listenIsLoggedIn } from '../application/service/listenIsLoggedIn';
import { getUserCompanyInfo } from '../application/service/getUserCompanyInfo';
import { LoginPage } from '../view/pages/Login/LoginPage';
import { RootState } from '../application/store/configureStore';
import { useSelector } from 'react-redux';

export const AppRouter = ({}) => {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean | 'loading'>('loading');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | 'loading'>(false); // fazer a lógica com o loading
  const userId = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    listenIsLoggedIn(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (!userId) return;
    getUserCompanyInfo(userId);
  }, [userId]);

  return (
    <>
      {isLoggedIn ? (
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      ) : (
        <LoginPage />
      )}
    </>
  );
};
