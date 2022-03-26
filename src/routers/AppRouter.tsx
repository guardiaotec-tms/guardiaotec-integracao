import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { listenIsLoggedIn } from '../application/hooks/useIsLoggedIn';
import { LoginPage } from '../view/pages/Login/LoginPage';

export const AppRouter = ({}) => {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean | 'loading'>('loading');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | 'loading'>(false); // fazer a lógica com o loading

  useEffect(() => {
    listenIsLoggedIn(setIsLoggedIn);
  }, []);

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
