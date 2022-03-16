import { TableCell, TableRow } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { uid } from 'react-uid';
import { TableRowOptions } from './TableRowOptions';

type Props = {
  row: string[];
  onRowUpdate: (row: string[]) => void;
};

export const CustomTableRow: FunctionComponent<Props> = ({
  row,
  onRowUpdate,
}) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      {row.map((column, index) => {
        return (
          <TableCell align='center' key={uid(column, index)}>
            {column}
          </TableCell>
        );
      })}
      {/* <TableCell align='center' sx={{ width: '10px' }}>
        <TableRowOptions />
      </TableCell> */}
    </TableRow>
  );
};
