import { TableCell, TableRow } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { uid } from 'react-uid';
import { RowCommand, TableRowOptions } from './TableRowOptions';
import uuid from 'react-uuid';

type Props = {
  row: string[];
  onRowCommand: (command: RowCommand, row: string[]) => void;
};

export const CustomTableRow: FunctionComponent<Props> = ({
  row,
  onRowCommand,
}) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      {row.map((column, index) => {
        return (
          <TableCell align='center' key={uuid()}>
            {column}
          </TableCell>
        );
      })}
      <TableCell align='center' sx={{ width: '10px' }}>
        <TableRowOptions onRowCommand={onRowCommand} row={row} />
      </TableCell>
    </TableRow>
  );
};
