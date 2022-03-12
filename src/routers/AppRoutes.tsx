import React, { FunctionComponent } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { RegisterDriverPage } from '../view/pages/Driver/RegisterDriverPage';
import { RegisterVehiclePage } from '../view/pages/Vehicle/RegisterVehiclePage';
import { RegisterCompanyPage } from '../view/pages/Company/RegisterCompanyPage';
import { DriverPage } from '../view/pages/Driver/DriverPage';
import { VehiclePage } from '../view/pages/Vehicle/VehiclePage';
import { CompanyPage } from '../view/pages/Company/CompanyPage';
import App from '../App';

type Props = {};

export const AppRoutes: FunctionComponent<Props> = ({}) => {
  return (
    <Routes>
      <Route path='/driver/register' element={<RegisterDriverPage />} />
      <Route path='/driver' element={<DriverPage />} />
      <Route path='/vehicle/register' element={<RegisterVehiclePage />} />
      <Route path='/vehicle' element={<VehiclePage />} />
      <Route path='/company/register' element={<RegisterCompanyPage />} />
      <Route path='/company' element={<CompanyPage />} />
      <Route path='/' element={<App />}></Route>
    </Routes>
  );
};
