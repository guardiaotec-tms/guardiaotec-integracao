import { Driver } from './../../domain/entities/Driver';
import { DriverRepositoryDatabase } from './../../infra/repository/DriverRepositoryDatabase';
import { useActions } from './useActions';
import { RootState, store } from './../store/configureStore';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setDrivers } from '../store/features/drivers/driversSlice';

export const useDrivers = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const drivers = useSelector((state: RootState) => state.drivers.drivers);
  const { setDrivers } = useActions();
  const repo = new DriverRepositoryDatabase();

  useEffect(() => {
    if (!userId) return;
    // repo.getDrivers(setDrivers);
    // downloadDrivers(setDrivers);
  }, [userId]);

  // fazer o slice dos drivers
  // puxar o driver do useSelector
  return drivers;
};
