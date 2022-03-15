import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { useIsLoggedIn } from '../application/hooks/useIsLoggedIn';
import { LoginPage } from '../view/pages/Login/LoginPage';

export const AppRouter = ({}) => {
  const isLoggedIn = useIsLoggedIn();

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
