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
import { Driver } from '../../../domain/entities/Driver';

type Props = {
  drivers: Driver[];
  setFilteredDrivers: (drivers: Driver[]) => void;
};

export const DriverFilter: FunctionComponent<Props> = ({
  drivers,
  setFilteredDrivers,
}) => {
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    if (!filterText) setFilteredDrivers(drivers);
    let filteredDrivers = drivers.filter((d) => {
      return d.values.nome
        .toLowerCase()
        .includes(filterText.toLocaleLowerCase());
    });
    setFilteredDrivers(filteredDrivers);
  }, [filterText, drivers]);

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
