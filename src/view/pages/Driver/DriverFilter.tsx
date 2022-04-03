import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { dispatchSetSelectedLTU } from '../../../application/store/actions/company';
import { RootState } from '../../../application/store/configureStore';
import { useSelector } from 'react-redux';
import { fetchFTs } from '../../../infra/services/fetchFTs';
import { FT } from '../../../domain/entities/FT';
import { Driver } from '../../../domain/entities/Driver';

type Props = {
  drivers: Driver[];
  setFilteredDrivers: (drivers: Driver[]) => void;
};

export const DriverFilter: FunctionComponent<Props> = ({
  drivers,
  setFilteredDrivers,
}) => {
  const [fts, setFTs] = useState<FT[]>([]);
  const [filterText, setFilterText] = useState('');
  const { selectedLTU, adminSelectedCompanyId, userCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  useEffect(() => {
    fetchFTs(setFTs);
  }, [adminSelectedCompanyId, userCompanyId]);

  useEffect(() => {
    let filteredDrivers = drivers.filter((d) => {
      return d.nome.toLowerCase().includes(filterText.toLocaleLowerCase());
    });
    setFilteredDrivers(filteredDrivers);
  }, [filterText]);

  const handleChange = (e: any) => {
    setFilterText(e.target.value);
  };

  return (
    <Box sx={{ position: 'absolute', left: 220, top: 80 }}>
      <Box sx={{ mb: 1.3 }}>
        <TextField
          id='driverfilter'
          label='Motorista'
          value={filterText}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};
