import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { FunctionComponent } from 'react';
import { dispatchSetSelectedFTType } from '../../../application/store/actions/company';
import { RootState } from '../../../application/store/configureStore';
import { useSelector } from 'react-redux';

type Props = {};

export const FTTypeFilter: FunctionComponent<Props> = ({}) => {
  const { selectedFTType, adminSelectedCompanyId, userCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  const handleSelectFTType = (event: SelectChangeEvent) => {
    const ftType = event.target.value;
    //@ts-ignore
    dispatchSetSelectedFTType(ftType);
  };

  return (
    <Box sx={{ position: 'absolute', left: 410, top: 80 }}>
      <Box sx={{ mb: 1.3 }}>
        <FormControl sx={{ minWidth: 180 }} fullWidth>
          <InputLabel id='demo-simple-select-helper-label'>
            Tipo De Ficha
          </InputLabel>
          <Select
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            value={selectedFTType || ''}
            label={'Tipo De Ficha'}
            onChange={handleSelectFTType}
            fullWidth
          >
            <MenuItem value={'A'}>A</MenuItem>
            <MenuItem value={'B'}>B</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
