import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  TextField,
} from '@mui/material';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { FormFieldValue, IFormField } from '../../../domain/entities/FormField';
import { AlertSnackbar } from '../Common/AlertSnackbar';
import { RenderFormField } from '../FormField/RenderFormField';
import { VinculoRepositoryDatabase } from '../../../infra/repository/VinculoRepositoryDatabase';
import { Vinculo } from '../../../domain/entities/Vinculo';
import { Company } from '../../../domain/entities/Company';
import { VehicleRepositoryDatabase } from '../../../infra/repository/VehicleRepositoryDatabase';
import { Vehicle } from '../../../domain/entities/Vehicle';
import { Itinerary } from '../../../domain/entities/Itinerary';
import { ItineraryRepositoryDatabase } from '../../../infra/repository/ItineraryRepositoryDatabase';
import { DriverRepositoryDatabase } from '../../../infra/repository/DriverRepositoryDatabase';
import { Driver } from '../../../domain/entities/Driver';
import { FTRepositoryDatabase } from '../../../infra/repository/FTRepositoryDatabase';
import { FT } from '../../../domain/entities/FT';
import { useSelector } from 'react-redux';
import { RootState } from '../../../application/store/configureStore';
import { getCompanyInfo } from '../../../application/service/getUserCompanyInfo';

type Props = {};

const makeInitialFormState = (formFields: IFormField[]) => {
  let state: any = {};
  for (const field of formFields) {
    state[field.label] = '';
  }
  return state;
};

export const RegisterVinculoForm: FunctionComponent<Props> = ({}) => {
  const [state, setState] = useState<any>({});
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [companyName, setCompanyName] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [fts, setFTs] = useState<FT[]>([]);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { selectedLTU, adminSelectedCompanyId, userCompanyId } = useSelector(
    (state: RootState) => state.companies
  );
  const [selectedCompanyId, setSelectedCompanyId] = useState('');

  console.log(process.env.REACT_APP_DEV_MODE);
  console.log(process.env.NODE_ENV);

  useEffect(() => {
    if (isAdmin && adminSelectedCompanyId) {
      setSelectedCompanyId(adminSelectedCompanyId);
    } else if (!isAdmin && userCompanyId) {
      setSelectedCompanyId(userCompanyId);
    }
  }, [adminSelectedCompanyId, userCompanyId]);

  useEffect(() => {
    if (!selectedCompanyId) return;
    const fetch = async () => {
      const driversRepo = new DriverRepositoryDatabase();
      const drivers = await driversRepo.getDriversFromCompanyId(
        selectedCompanyId
      );
      setDrivers(drivers);

      const vehiclesRepo = new VehicleRepositoryDatabase();
      const vehicles = await vehiclesRepo.getVehiclesFromCompanyId(
        selectedCompanyId
      );
      setVehicles(vehicles);

      const ftsRepo = new FTRepositoryDatabase();
      const fts = await ftsRepo.getFTsFromCompanyId(selectedCompanyId);
      setFTs(fts);

      const itinerariesRepo = new ItineraryRepositoryDatabase();
      const itineraries = await itinerariesRepo.getItinerariesFromCompanyId(
        selectedCompanyId
      );
      setItineraries(itineraries);
    };

    fetch();
  }, [selectedCompanyId]);

  const vinculoFields: IFormField[] = [
    {
      label: 'Motorista (CNH)',
      type: 'List Selection',
      options: drivers.map((d) => d.nome.split(' ')[0] + ' ' + d.cnh),
      id: 1,
      index: 1,
    },
    {
      label: 'Veículo (Placa)',
      type: 'List Selection',
      options: vehicles.map((v) => v.values.Placa),
      id: 2,
      index: 2,
    },
    {
      label: 'LTU',
      type: 'List Selection',
      options: fts.map((ft) => ft.values['Nº da Linha']),
      id: 3,
    },
    {
      label: 'Nº da FT',
      type: 'List Selection',
      options: fts.map((ft) => ft.values['Nº da FT']),
      id: 4,
    },
  ];

  const startState = () => setState(makeInitialFormState(vinculoFields));

  useEffect(() => {
    startState();
  }, []);

  const onChange = (label: string, value: FormFieldValue) => {
    setState({ ...state, [label]: value });
  };

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };

  const onSave = async () => {
    try {
      const vinculo = new Vinculo({ Transportadora: companyName, ...state });
      const repo = new VinculoRepositoryDatabase();

      if (isAdmin && adminSelectedCompanyId) {
        await repo.addVinculo(vinculo, adminSelectedCompanyId);
        setSuccessMessage('Vinculo cadastrado!');
        startState();
      } else if (userCompanyId) {
        await repo.addVinculo(vinculo, userCompanyId);
        setSuccessMessage('Vinculo cadastrado!');
        startState();
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const getCompanyId = () => {
    if (isAdmin && adminSelectedCompanyId) return adminSelectedCompanyId;
    if (userCompanyId) return userCompanyId;

    //@ts-ignore
    window.location = '/vinculo';
    return 'Erro! Volte para a página de vínculo!';
  };

  const getCompanyName = async (companyId: string) => {
    const info = await getCompanyInfo(companyId);
    return info!.Transportadora;
  };

  useEffect(() => {
    const func = async () => {
      const id = getCompanyId();
      const name = await getCompanyName(id);
      setCompanyName(name);
    };
    func();
  }, [adminSelectedCompanyId, userCompanyId]);

  return (
    <Card sx={{ width: '400px', padding: '10px' }}>
      <CardHeader title='Cadastro de Vínculo' subheader='' />
      <Box sx={{ mb: '10px' }}>
        <TextField
          id='transportadora'
          label='Transportadora'
          value={companyName}
          onChange={() => {}}
          disabled
          fullWidth
        />
      </Box>
      {vinculoFields.map((field: IFormField) => {
        return (
          <Box sx={{ mb: '10px' }} key={field.id}>
            <RenderFormField
              field={field}
              onChange={onChange}
              value={state[field.label]}
            />
          </Box>
        );
      })}

      <CardActions>
        <Button
          variant='contained'
          color='primary'
          size='small'
          onClick={onSave}
        >
          Salvar
        </Button>
      </CardActions>
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
    </Card>
  );
};
