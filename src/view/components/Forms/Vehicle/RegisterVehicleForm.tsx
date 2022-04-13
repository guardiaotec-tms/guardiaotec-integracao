import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Vehicle } from '../../../../domain/entities/Vehicle';
import { AlertSnackbar } from '../../Common/AlertSnackbar';
import { VehicleRepositoryDatabase } from '../../../../infra/repository/VehicleRepositoryDatabase';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../application/store/configureStore';
import { BaseVehicleForm } from './BaseVehicleForm';
import { vehicleFormFields } from './vehicleFormFields';
import { makeInitialFormState } from '../Utils/makeInitialFormState';
import { Box, Button, Card, CardActions, CardHeader } from '@mui/material';
import { RenderFormField } from '../../FormField/RenderFormField';
import { FormFieldValue } from '../../../../domain/entities/FormField';
import { FileUploader } from '../../Common/FileUploader';
import { selectCurrentRelatedCompanyId } from '../../../../infra/services/selectCurrentRelatedCompanyId';

type Props = {};

export const RegisterVehicleForm: FunctionComponent<Props> = ({}) => {
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );
  const fileUploaderHandleSaveRef = useRef<any>();

  const resetState = (setState: any) =>
    setState(makeInitialFormState(vehicleFormFields()));

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };

  const onSave = async (state: any, setState: any) => {
    try {
      const companyId = selectCurrentRelatedCompanyId();
      //@ts-ignore
      if (!companyId) return (window.location = '/vehicle');

      for (const key in state)
        if (!state[key]) throw new Error(`Campo ${key} inválido!`);

      const uploadResult = await fileUploaderHandleSaveRef.current();

      const vehicle = new Vehicle({
        vehicleDocumentFileData: { ...uploadResult },
        ...state,
      });
      const repo = new VehicleRepositoryDatabase();

      if (isAdmin && adminSelectedCompanyId) {
        await repo.addVehicle(vehicle, adminSelectedCompanyId);
        setSuccessMessage('Veículo cadastrado!');
        resetState(setState);
      } else if (userCompanyId) {
        await repo.addVehicle(vehicle, userCompanyId);
        setSuccessMessage('Veículo cadastrado!');
        resetState(setState);
      }
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  const injectedFormFieldsComponents = [
    <Box sx={{ mb: '10px' }}>
      <FileUploader
        handleSaveRef={fileUploaderHandleSaveRef}
        uploadLabel={'Upload do documento do veículo'}
        folderName='vehicles'
      />
    </Box>,
  ];

  return (
    <div>
      <BaseVehicleForm
        injectedFormFieldsComponents={injectedFormFieldsComponents}
        onSave={onSave}
      />
      <AlertSnackbar open={!!error} onClose={onAlertClose} severity='warning'>
        {error}
      </AlertSnackbar>
      <AlertSnackbar
        open={!!successMessage}
        onClose={onAlertClose}
        severity='success'
      >
        {successMessage}
      </AlertSnackbar>
    </div>
  );
};
