import React, { FunctionComponent, useEffect, useState } from 'react';
import { AlertSnackbar } from '../../Common/AlertSnackbar';
import { Dialog } from '@mui/material';
import { Driver } from '../../../../domain/entities/Driver';
import { RootState } from '../../../../application/store/configureStore';
import { useSelector } from 'react-redux';
import { makeInitialFormState } from '../Utils/makeInitialFormState';
import { BaseVehicleForm } from './BaseVehicleForm';
import { vehicleFormFields } from './vehicleFormFields';
import { VehicleRepositoryDatabase } from '../../../../infra/repository/VehicleRepositoryDatabase';
import { Vehicle } from '../../../../domain/entities/Vehicle';

type Props = {
  open: boolean;
  onClose: () => void;
  vehicle: Vehicle;
  vehicleId: string;
};

export const EditVehicleForm: FunctionComponent<Props> = ({
  open,
  onClose,
  vehicle,
  vehicleId,
}) => {
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [initialState, setInitialState] = useState<any>();
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  const resetState = (setState: any) =>
    setState(makeInitialFormState(vehicleFormFields()));

  useEffect(() => {
    let initialState: any = {};
    for (const field in vehicle.values) {
      //@ts-ignore
      initialState[field] = vehicle.values[field];
    }
    console.log(initialState);
    setInitialState(initialState);
  }, [vehicle]);

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };

  const onSave = async (state: any, setState: any) => {
    try {
      for (const key in state)
        if (!state[key]) throw new Error(`Campo ${key} inválido!`);

      const vehicle = new Vehicle(state);
      const repo = new VehicleRepositoryDatabase();
      if (isAdmin && adminSelectedCompanyId) {
        await repo.updateVehicle(vehicle, adminSelectedCompanyId, vehicleId);
        setSuccessMessage('Veículo atualizado!');
        resetState(setState);
      } else if (userCompanyId) {
        await repo.updateVehicle(vehicle, userCompanyId, vehicleId);
        setSuccessMessage('Veículo atualizado!');
        resetState(setState);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby={'EditDriverForm'}>
      <BaseVehicleForm onSave={onSave} initialState={initialState} />
      <AlertSnackbar
        open={!!successMessage}
        onClose={onAlertClose}
        severity='success'
      >
        {successMessage}
      </AlertSnackbar>
      <AlertSnackbar open={!!error} onClose={onAlertClose} severity='error'>
        {error}
      </AlertSnackbar>
    </Dialog>
  );
};
