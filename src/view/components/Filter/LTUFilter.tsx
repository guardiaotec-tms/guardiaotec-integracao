import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { dispatchSetSelectedLTU } from '../../../application/store/actions/company';
import { RootState } from '../../../application/store/configureStore';
import { useSelector } from 'react-redux';
import { fetchFTs } from '../../../infra/services/fetchFTs';
import { FT } from '../../../domain/entities/FT';

type Props = {};

export const LTUFilter: FunctionComponent<Props> = ({}) => {
  const [fts, setFTs] = useState<FT[]>([]);
  const { selectedLTU, adminSelectedCompanyId, userCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  useEffect(() => {
    fetchFTs(setFTs);
  }, [adminSelectedCompanyId, userCompanyId]);

  const handleSelectLTU = (event: SelectChangeEvent) => {
    const LTU = event.target.value;
    dispatchSetSelectedLTU(LTU);
  };

  return (
    <Box sx={{ position: 'absolute', left: 220, top: 80 }}>
      <Box sx={{ mb: 1.3 }}>
        <FormControl sx={{ minWidth: 180 }} fullWidth>
          <InputLabel id='demo-simple-select-helper-label'>LTU</InputLabel>
          <Select
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            value={selectedLTU || ''}
            label={'LTU'}
            onChange={handleSelectLTU}
            fullWidth
          >
            {
              fts &&
                fts
                  .sort(function (a, b) {
                    if (a.values['Nº da Linha'] < b.values['Nº da Linha']) {
                      return -1;
                    }
                    if (a.values['Nº da Linha'] > b.values['Nº da Linha']) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((ft: FT) => {
                    return (
                      <MenuItem
                        key={ft.values['Nº da FT']}
                        value={ft.values['Nº da Linha']}
                      >
                        {ft.values['Nº da Linha']}
                      </MenuItem>
                    );
                  })
              // .concat([
              //   <MenuItem key={'unique'} value={'Todas'}>
              //     Todas
              //   </MenuItem>,
              // ])
            }
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
