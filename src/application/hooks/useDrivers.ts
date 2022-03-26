import { RootState } from './../store/configureStore';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const useDrivers = () => {
  const drivers = useSelector((state: RootState) => state.drivers.drivers);

  useEffect(() => {});

  // fazer o slice dos drivers
  // puxar o driver do useSelector
};
