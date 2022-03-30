import { Box, Button, Card, CardActions, CardHeader } from '@mui/material';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { FormFieldValue, IFormField } from '../../../domain/entities/FormField';
import { AlertSnackbar } from '../Common/AlertSnackbar';
import { RenderFormField } from '../FormField/RenderFormField';
import { VinculoRepositoryDatabase } from '../../../infra/repository/VinculoRepositoryDatabase';
import { Vinculo } from '../../../domain/entities/Vinculo';
import { CompanyRepositoryDatabase } from '../../../infra/repository/CompanyRepositoryDatabase';
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

  const ds = useSelector((state: RootState) => state.drivers.drivers);

  const [companies, setCompanies] = useState<Company[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>(ds);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [fts, setFTs] = useState<FT[]>([]);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const companiesRepo = new CompanyRepositoryDatabase();
      const companies = await companiesRepo.getCompanies();
      setCompanies(companies);

      const driversRepo = new DriverRepositoryDatabase();
      const drivers = await driversRepo.getDrivers();
      setDrivers(drivers);

      const vehiclesRepo = new VehicleRepositoryDatabase();
      const vehicles = await vehiclesRepo.getVehicles();
      setVehicles(vehicles);

      const ftsRepo = new FTRepositoryDatabase();
      const fts = await ftsRepo.getFTs();
      setFTs(fts);

      const itinerariesRepo = new ItineraryRepositoryDatabase();
      const itineraries = await itinerariesRepo.getItineraries();
      setItineraries(itineraries);
    };

    fetch();
  }, []);

  const vinculoFields: IFormField[] = [
    {
      label: 'Transportadora',
      type: 'List Selection',
      options: companies.map((c) => c.values.Transportadora),
      id: 0,
      index: 0,
    },
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
      options: itineraries.map((i) => i.values['LTU Correspondente']),
      id: 3,
    },
    {
      label: 'Nº da FT',
      type: 'List Selection',
      options: fts.map((ft) => ft.values['Nº da FT']),
      id: 4,
    },

    // { label: 'Destino', type: 'Short Text', id: 3, index: 3 },
    // { label: 'Data de Vigencia Início', type: 'Date', id: 4, index: 4 },
    // { label: 'Data de Vigencia Fim', type: 'Date', id: 5, index: 5 },
    // {
    //   label: 'Tipo de Linha',
    //   type: 'List Selection',
    //   options: ['Contratada'],
    //   id: 6,
    //   index: 6,
    // },
    // {
    //   label: 'Frequência',
    //   type: 'Checkbox',
    //   options: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    //   id: 7,
    //   index: 7,
    // },
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
      const vinculo = new Vinculo(state);
      const repo = new VinculoRepositoryDatabase();
      await repo.addVinculo(vinculo);
      setSuccessMessage('Vinculo cadastrado!');
      startState();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Card sx={{ width: '400px', padding: '10px' }}>
      <CardHeader title='Cadastro de Vínculo' subheader='' />
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
